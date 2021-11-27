import { Category } from "../../settings/interfaces/category.interfaces";
import { Unit } from "../../settings/interfaces/unidad-medida.interface";

export interface SelectableProduct
{
    id: string;
    category: Category;
    unit: Unit;
    name: string;
    img: string;    
}