import { SaleItem } from "../../sales/interfaces/SaleItem";

export interface Purchase {
    created_at: Date;
    updated_at: Date;
    establishment: string;
    id: string;
    products: SaleItem[];    
    user: string;
    // provider: {};
    total: number
    total_inversion: number;
}
  