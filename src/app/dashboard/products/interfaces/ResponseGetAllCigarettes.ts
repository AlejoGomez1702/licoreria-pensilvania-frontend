import { Product } from "./Product";

export interface ResponseGetAllCigarettes
{
    total: number;
    cigarettes: Product[];
}