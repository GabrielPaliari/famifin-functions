import { Transaction } from "../DTOs/Models/Transaction.model";


export const userTransactionsMock: Transaction[] = [
    {
        yearMonth: '2022-04',
        description: 'editada de novo',
        valueInCents: 8520,
        category: {
            description: 'Viagens',
            id: '4sJvfGo3nKFbI8ISxncd',
            iconModel: {
                fontFamily: 'MaterialIcons',
                iconName: 'flight_takeoff',
                codePoint: 58009
            }
        },
        day: '30',
        userId: 'rYYspLc1M7pzKguzF1R6'
    },
    {
        yearMonth: '2022-04',
        description: 'Pepe',
        valueInCents: 1520,
        category: {
            description: 'Pets',
            id: 'qDpyktGc3YrWtGvYLjoM',
            iconModel: {
                fontFamily: 'MaterialIcons',
                iconName: 'pets',
                codePoint: 58529
            }
        },
        day: '30',
        userId: 'rYYspLc1M7pzKguzF1R6'
    },
    {
        yearMonth: '2022-04',
        description: 'Nova',
        valueInCents: 4500,
        category: {
            description: 'Pets',
            id: 'qDpyktGc3YrWtGvYLjoM',
            iconModel: {
                fontFamily: 'MaterialIcons',
                iconName: 'pets',
                codePoint: 58529
            }
        },
        userId: 'rYYspLc1M7pzKguzF1R6',
        day: '15'
    },
    {
        yearMonth: '2022-04',
        description: 'nova',
        valueInCents: 1233,
        category: {
            description: 'carrinho',
            id: 'jSIqPlX7VFfDx6SB1N0l',
            iconModel: {
                fontFamily: 'MaterialIcons',
                iconName: 'shopping_cart',
                codePoint: 58780
            }
        },
        day: '15',
        userId: 'rYYspLc1M7pzKguzF1R6'
    },

    {
        yearMonth: '2022-04',
        description: 'aaaa',
        valueInCents: 231312,
        category: {
            description: 'Viagens',
            id: '4sJvfGo3nKFbI8ISxncd',
            iconModel: {
                fontFamily: 'MaterialIcons',
                iconName: 'flight_takeoff',
                codePoint: 58009
            }
        },
        day: '14',
        userId: 'rYYspLc1M7pzKguzF1R6'
    },
    {
        yearMonth: '2022-04',
        description: 'primeira',
        valueInCents: 1111,
        category: {
            description: 'carrinho',
            id: 'jSIqPlX7VFfDx6SB1N0l',
            iconModel: {
                fontFamily: 'MaterialIcons',
                iconName: 'shopping_cart',
                codePoint: 58780
            }
        },
        userId: 'rYYspLc1M7pzKguzF1R6',
        day: '1',
    }];