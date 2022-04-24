import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {Transaction} from "./DTOs/Models/Transaction.model";
import {UserStatisticsService} from "./services/UserStatisticsService";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const getTransactions = functions.firestore
    .document("transactions/{transactionId}")
    .onCreate(async (snap, _context) => {
      const newTransaction: Transaction = snap.data() as Transaction;
      const userStatsService = new UserStatisticsService(newTransaction);

      await userStatsService.updateUserStatistics();

      console.log("user statistics updated");
    });
