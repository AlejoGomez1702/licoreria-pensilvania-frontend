import { Product } from "../../products/interfaces/Product";

export interface SaleItem
{
    id: string;
    product: Product;
    product_name?: string;
    count: number;
    second_sale_price: number;
    sale_price: number;
    other_price?: number;
    is_second_price?: boolean;
    count_second_price?: number;
    purchase_price?: number;
}