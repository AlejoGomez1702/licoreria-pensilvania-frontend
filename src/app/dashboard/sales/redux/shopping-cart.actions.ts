import { Action } from "@ngrx/store";

export const ADD_PRODUCT = '[Shopping Cart] Add_Product';
export const REMOVE_PRODUCT = '[Shopping Cart] Remove_Product';
export const CLEAR_CART = '[Shopping Cart] Clear_Cart';

export class AddProductAction implements Action
{
    readonly type = ADD_PRODUCT;
}

export class RemoveProductAction implements Action
{
    readonly type = REMOVE_PRODUCT;
}

export class ClearCartAction implements Action
{
    readonly type = CLEAR_CART;
}