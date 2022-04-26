import * as functions from "firebase-functions";
import {Transaction} from "./DTOs/Models/Transaction.model";
import {UserStatisticsService} from "./services/UserStatisticsService";

export const updateStatistics = functions.firestore
    .document("transactions/{transactionId}")
    .onWrite(async (snap: any, _context) => {
      const newTransaction: Transaction = snap.data() as Transaction;
      const userStatsService = new UserStatisticsService(newTransaction);

      await userStatsService.updateUserStatistics();

      console.log("user statistics updated");
    });
