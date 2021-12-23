import { CartItem } from "./CartItem";

export interface Sale {
    created_at: string;
    establishment: string;
    id: string;
    products: CartItem[];
    updated_at: string;
    user: string;
}
  