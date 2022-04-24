import {YearMonthStr} from "../../common/date.types";

export interface Transaction {
    day: string,
    valueInCents: number,
    yearMonth: YearMonthStr,
    description: string,
    userId: string
}
