import { Alcohol } from "../../settings/interfaces/alcohol.interface";
import { Category } from "../../settings/interfaces/category.interfaces";
import { Unit } from "../../settings/interfaces/unidad-medida.interface";
import { Inventory } from "./Inventory";

export interface Product 
{
    features:          string[];
    description:       string;
    sale_price:        number;
    purchase_price:    number;
    barcode:           string;
    stock:             number;
    current_existence: number;
    providers:         any[];
    name:              string;
    category:          Category;
    alcohol:           Alcohol;
    unit:              Unit;
    inventory:         Inventory;
    user:              string;
    created_at:        Date;
    updated_at:        Date;
    id:                string;
}
