import { Product } from "./Product";

export interface ResponseGetAllDrinks
{
    total: number;
    drinks: Product[];
}