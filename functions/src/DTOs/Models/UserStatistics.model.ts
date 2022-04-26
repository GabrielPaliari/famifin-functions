export interface UserStatistics {
    totalValue: number;
    transactionsCount: number;
    categoriesStats: CategoriesStats;
}

export interface CategoriesStats {
    [key: string]: {
        category: Category;
        stats: {
            count: number;
            value: number;
        }  
    };
}

export interface Category {
    id: string;
    description: string;
    iconModel: {
        codePoint: number;
        fontFamily: string;
        iconName: string;
    };
}
