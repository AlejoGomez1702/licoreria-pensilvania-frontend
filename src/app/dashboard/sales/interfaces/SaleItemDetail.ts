import { SaleItem } from "./SaleItem";

export interface SaleItemDetail
{
    index: number; // # de venta 
    id: string; // Id del producto
    product?: SaleItem;
}