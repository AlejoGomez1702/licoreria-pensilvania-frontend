import { Sale } from "./Sale";

export interface ResponseGetAllSales
{
    total: number;
    sales: Sale[];
}