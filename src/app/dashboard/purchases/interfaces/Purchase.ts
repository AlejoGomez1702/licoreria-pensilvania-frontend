import { CartItem } from "../../sales/interfaces/CartItem";

export interface Purchase {
    created_at: Date;
    updated_at: Date;
    establishment: string;
    id: string;
    products: CartItem[];    
    user: string;
    // provider: {};
    total: number
    total_inversion: number;
}
  