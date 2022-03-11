import { Sale } from "./Sale";

export interface ResponseGetAllSales
{
    total: number;
    sales: Sale[];
    statistics: Statistic[];
    statisticsInversion: Statistic[];
}


export interface Statistic
{
    day: number;
    year: number;
    count: number;
    totalAmount: number;
}