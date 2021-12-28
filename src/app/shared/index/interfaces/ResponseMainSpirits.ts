import { Product } from "src/app/dashboard/products/interfaces/Product";

export interface ResponseMainSpirits
{
    total?: number;
    spirits: Product[];
}