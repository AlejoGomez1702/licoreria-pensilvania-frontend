import { Product } from "./Product";

export interface ResponseSearch
{
    results: Product[];
    total: number;
}