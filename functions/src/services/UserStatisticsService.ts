import {Transaction} from "../DTOs/Models/Transaction.model";
import {CategoriesStats, UserStatistics} from "../DTOs/Models/UserStatistics.model";
import {DocumentSnapshot} from "@google-cloud/firestore";
import * as firebaseAdmin from "firebase-admin";

/**
 * Service to calculate month statistics
 */
export class UserStatisticsService {
  private db: firebaseAdmin.firestore.Firestore;
  private userId;
  private yearMonth;

  constructor({newTransaction}: {newTransaction: Transaction}) {
    this.db = firebaseAdmin.firestore();
    this.yearMonth = newTransaction.yearMonth;
    this.userId = newTransaction.userId;
  }

  async updateUserStatistics(): Promise<any> {
    const userName = await this.getUserName();
    const userTransactions = await this.getUserTransactions();
    const newStatistics = this.calcNewUserStatistics(userTransactions);
    return this.setUserStatistics(newStatistics, userName);
  }

  private async getUserName(): Promise<string> {
    const userRef = this.db.doc(`users/${this.userId}`);
    const userData = await userRef.get()
        .then((snapshot: DocumentSnapshot) => snapshot.data());
    return userData?.name as string;
  }

  private async getUserTransactions(): Promise<Transaction[]> {
    // pega as transações do user e transforma em array
    const transactionsRef = this.db.collection("transactions");
    const transactions = await transactionsRef
        .where("userId", "==", this.userId)
        .where("yearMonth", "==", this.yearMonth)
        .get()
        .then((snapshot) => {
          return snapshot.docs.map((doc) => doc.data() as Transaction);
        });
    return transactions;
  }

  calcNewUserStatistics(userTransactions: Transaction[]):
  UserStatistics {
    const initialValue: UserStatistics = {
      totalValue: 0,
      transactionsCount: 0,
      categoriesStats: {}
    };
    const newStats: UserStatistics =
        userTransactions.reduce((userStatsAcc: UserStatistics, transaction) => {
          
          userStatsAcc = {
            totalValue: userStatsAcc.totalValue += +(transaction.valueInCents),
            transactionsCount: userStatsAcc.transactionsCount + 1,
            categoriesStats: this.categriesStatsIteration(userStatsAcc, transaction),
          };
          return userStatsAcc;
        }, initialValue);
    return newStats;
  }

  private categriesStatsIteration(userStatistics: UserStatistics, transaction: Transaction): CategoriesStats {
    const categoriesStats = userStatistics.categoriesStats;
    const category = transaction.category;
    if (categoriesStats[category.id]) {
      const stats = categoriesStats[category.id].stats
      return {
        ...categoriesStats,
        [category.id]: {
          category,
          stats: {
            count: stats.count + 1,
            value: stats.value + transaction.valueInCents
          },
        }
      }
    }
    return {
      ...categoriesStats,
      [category.id]: {
        category,
        stats: {
          count: 1,
          value: transaction.valueInCents
        }
      }
    }
  }

  private setUserStatistics(statistics: UserStatistics, userName: string):
  Promise<unknown> {
    return this.db.doc(`statistics/${this.userId}/months/${this.yearMonth}`)
        .set({
          ...statistics,
          userName,
        });
  }
}
