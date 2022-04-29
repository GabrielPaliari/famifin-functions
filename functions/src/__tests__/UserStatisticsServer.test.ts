import { UserStatisticsService } from "../services/UserStatisticsService";
import { userStatsResult } from "../mocks/user-stats.result";
import { userTransactionsMock } from "../mocks/user-transactions.mock"

describe('UserStatisticsService', () => {
    const userStatService = new UserStatisticsService({ newTransaction: userTransactionsMock[0]});
    const statsResult = userStatService.calcNewUserStatistics(userTransactionsMock);

    it('Should calculate general statistics properly given an array of transactions', () => {
        expect(statsResult).toHaveProperty('totalValue', 248196);
        expect(statsResult).toHaveProperty('transactionsCount', 6);
    });

    it('Should populate categories props', () => {
        expect(statsResult).toHaveProperty('categoriesStats');
        expect(statsResult).toHaveProperty('categoriesStats.4sJvfGo3nKFbI8ISxncd');
        expect(statsResult).toHaveProperty('categoriesStats.4sJvfGo3nKFbI8ISxncd.category', {
            description: 'Viagens',
            id: '4sJvfGo3nKFbI8ISxncd',
            iconModel: {
                fontFamily: 'MaterialIcons',
                iconName: 'flight_takeoff',
                codePoint: 58009
            }
        });
        expect(statsResult).toHaveProperty('categoriesStats.qDpyktGc3YrWtGvYLjoM');
        expect(statsResult).toHaveProperty('categoriesStats.qDpyktGc3YrWtGvYLjoM.category', {
            description: 'Pets',
            id: 'qDpyktGc3YrWtGvYLjoM',
            iconModel: {
                fontFamily: 'MaterialIcons',
                iconName: 'pets',
                codePoint: 58529
            }
        });
        expect(statsResult).toHaveProperty('categoriesStats.jSIqPlX7VFfDx6SB1N0l');
        expect(statsResult).toHaveProperty('categoriesStats.jSIqPlX7VFfDx6SB1N0l.category', {
            description: 'carrinho',
            id: 'jSIqPlX7VFfDx6SB1N0l',
            iconModel: {
                fontFamily: 'MaterialIcons',
                iconName: 'shopping_cart',
                codePoint: 58780
            }
        });
        // expect(statsResult).toEqual(userStatsResult);
    });

    it('Should count transactions for each category', () => {
        expect(statsResult).toHaveProperty('categoriesStats.4sJvfGo3nKFbI8ISxncd.stats.count', 2);
        expect(statsResult).toHaveProperty('categoriesStats.qDpyktGc3YrWtGvYLjoM.stats.count', 2);
        expect(statsResult).toHaveProperty('categoriesStats.jSIqPlX7VFfDx6SB1N0l.stats.count', 2);
    });

    it('Should sum transactions value for each category', () => {
        expect(statsResult).toHaveProperty('categoriesStats.4sJvfGo3nKFbI8ISxncd.stats.value', 239832);
        expect(statsResult).toHaveProperty('categoriesStats.qDpyktGc3YrWtGvYLjoM.stats.value', 6020);
        expect(statsResult).toHaveProperty('categoriesStats.jSIqPlX7VFfDx6SB1N0l.stats.value', 2344);
    });

    it('Should be deep equal result object', () => {
        expect(statsResult).toEqual(userStatsResult);
    });
})