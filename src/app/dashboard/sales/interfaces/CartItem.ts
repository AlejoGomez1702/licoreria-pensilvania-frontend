import { Product } from "../../products/interfaces/Product";

export interface CartItem
{
    product: Product;
    count: number;
    sale_price: number;
    purchase_price?: number;
}