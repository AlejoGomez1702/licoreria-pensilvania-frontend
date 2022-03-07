import { Product } from "./Product";

export interface ResponseGetAllGroceries
{
    total: number;
    groceries: Product[];
}