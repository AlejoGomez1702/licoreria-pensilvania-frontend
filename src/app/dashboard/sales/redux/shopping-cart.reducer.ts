import { Action } from "@ngrx/store";
import { CartItem } from "../interfaces/CartItem";
import { addProductAction, ShoppingAction } from "./shopping-cart.actions";
import { initialState, ShoppingCartState } from "./ShoppingCartState";

export function shoppingCartReducer(
    state: ShoppingCartState = initialState, 
    action: ShoppingAction
): ShoppingCartState
{
    switch (action.type) 
    {
        case addProductAction.type: {
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.payload]
            };
        }            

        // case REMOVE_PRODUCT:
        //     // return state - 1;

        // case CLEAR_CART:
        //     // return 0;
    
        default:
            return state;
    }
}