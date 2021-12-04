import { Action, createAction, union } from "@ngrx/store";
import { CartItem } from "../interfaces/CartItem";

export const ADD_PRODUCT = '[Shopping Cart] Add_Product';
const REMOVE_PRODUCT = '[Shopping Cart] Remove_Product';
const CLEAR_CART = '[Shopping Cart] Clear_Cart';
const CONFIRM_CART = '[Shopping Cart] Confirm_Cart';

// export class AddProductAction implements Action
// {
//     readonly type = ADD_PRODUCT;

//     constructor(public payload: CartItem){}
// }

export const addProductAction = createAction(
    ADD_PRODUCT,
    (payload: CartItem) => ({payload})
);

// export class RemoveProductAction implements Action
// {
//     readonly type = REMOVE_PRODUCT;
// }

// export class ClearCartAction implements Action
// {
//     readonly type = CLEAR_CART;
// }

// export class ConfirmCartAction implements Action
// {
//     readonly type = CONFIRM_CART;
// }

const actions = union({
    addProductAction
});

export type ShoppingAction = typeof actions;