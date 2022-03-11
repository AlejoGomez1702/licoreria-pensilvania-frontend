import { CartItem } from "./CartItem";

export interface Sale {
    created_at: Date;
    updated_at: Date;
    establishment: string;
    id: string;
    products: CartItem[];    
    user: string;
    total: number
    total_inversion: number;
}
  