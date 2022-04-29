import * as functions from "firebase-functions";
import {Transaction} from "./DTOs/Models/Transaction.model";
import {UserStatisticsService} from "./services/UserStatisticsService";
import * as firebaseAdmin from "firebase-admin";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
});

export const updateStatistics = functions.firestore
    .document("transactions/{transactionId}")
    .onWrite(async (change, _context) => {
      const newTransaction: Transaction = change.after.data() as Transaction;
      const userStatsService = new UserStatisticsService({newTransaction});

      await userStatsService.updateUserStatistics();

      console.log("user statistics updated");
    });
