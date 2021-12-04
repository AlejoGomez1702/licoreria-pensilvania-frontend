import { CartItem } from "../interfaces/CartItem";

export const initialState: ShoppingCartState = {shoppingCart: []};

export interface ShoppingCartState
{
    shoppingCart: CartItem[];
}