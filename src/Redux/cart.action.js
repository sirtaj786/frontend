import { ADD_CART_ITEM, DECREASE_ITEM_QUANTITY, DELETE_CART_ITEM, GET_TOTAL_ITEM_PRICE, INCREASE_ITEM_QUANTITY } from "./cart.action.type";

export const add_cart_data=(payload)=>({type:ADD_CART_ITEM,payload});
export const delete_cart_data=(payload)=>({type:DELETE_CART_ITEM,payload});

export const increase_quantity=(payload)=>({type:INCREASE_ITEM_QUANTITY,payload});
export const decrease_quantity=(payload)=>({type:DECREASE_ITEM_QUANTITY,payload});
export const get_totalPrice=()=>({type:GET_TOTAL_ITEM_PRICE})