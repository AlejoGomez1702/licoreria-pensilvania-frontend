import { Action } from "@ngrx/store";
import { ADD_PRODUCT, CLEAR_CART, REMOVE_PRODUCT } from "./shopping-cart.actions";

export function ShoppingCartReducer( state: number = 10, action: Action )
{
    switch (action.type) {
        case ADD_PRODUCT:
            return state + 1;

        case REMOVE_PRODUCT:
            return state - 1;

        case CLEAR_CART:
            return 0;
    
        default:
            return state;
    }
}