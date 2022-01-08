import { Product } from "./Product";

export interface ResponseGetAllSpirits
{
    total: number;
    spirits: Product[];
}