import { Product } from "../../products/interfaces/Product";

export interface CartItem
{
    id: string;
    product: Product;
    count: number;
    sale_price: number;
    purchase_price?: number;
}