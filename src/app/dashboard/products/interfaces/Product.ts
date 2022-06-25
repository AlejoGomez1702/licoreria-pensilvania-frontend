import { Category } from "../../settings/interfaces/category.interfaces";
import { Unit } from "../../settings/interfaces/unidad-medida.interface";

export interface Product 
{
    id?:                    string;
    state?:                 boolean;
    img?:                   any;
    description?:           string;
    sale_price:             number;
    second_sale_price:      number;
    purchase_price:         number;
    barcode?:               string;
    stock:                  number;
    current_existence?:     number;
    providers?:             any[];
    name:                   string;
    category:               any;
    vol_alcohol:            number;
    unit:                   any;
    user?:                  string;
    created_at?:            Date;
    updated_at?:            Date;  
    supercategory:          string;
    establishment: any;
}
