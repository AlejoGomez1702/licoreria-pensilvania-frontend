import { Purchase } from "./Purchase";

export interface ResponseGetAllPurchases
{
    total: number;
    purchases: Purchase[];
    statistics: Statistic[];
}


export interface Statistic
{
    day: number;
    year: number;
    count: number;
    totalAmount: number;
}