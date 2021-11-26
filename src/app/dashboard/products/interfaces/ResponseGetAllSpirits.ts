import { Product } from "./Product";
import { Spirit } from "./Spirit";

export interface ResponseGetAllSpirits
{
    total: number;
    spirits: Product[];
}