import { Client } from "../../clients/interfaces/Client";
import { SaleItem } from "./SaleItem";

export interface Sale {
    created_at: Date;
    updated_at: Date;
    establishment: string;
    id: string;
    products: SaleItem[];    
    user: string;
    client?: Client;
    total: number
    total_inversion: number;
}
  