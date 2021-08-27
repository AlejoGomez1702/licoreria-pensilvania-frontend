import { Product } from "./Product";

export interface ResponseGetAllProducts
{
    total: number;
    products: Product[];
}