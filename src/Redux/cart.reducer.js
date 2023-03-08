import { ADD_CART_ITEM, DECREASE_ITEM_QUANTITY, DELETE_CART_ITEM, GET_TOTAL_ITEM_PRICE, INCREASE_ITEM_QUANTITY } from "./cart.action.type";

  
  const initialState = {
    cartData: [],
    totalPrice:0
  };
  
  export const CartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ADD_CART_ITEM:
        return { ...state, cartData: [...addToCart(state, payload)] }
      case DELETE_CART_ITEM:
        return { cartData: [...deleteItem(state, payload)] }
      case INCREASE_ITEM_QUANTITY:
        return { cartData: [...incrementQuantity(state.cartData,payload)] }
      case DECREASE_ITEM_QUANTITY:
        return { cartData: [...decrementQuantity(state.cartData,payload)] }
        case  GET_TOTAL_ITEM_PRICE : return {...state,totalPrice:calulatePrice(state.cartData)}
      default:
        return state;
    }
  };
  
  const deleteItem = (cart, id) => {
    let rest_cart_data = cart.cartData.filter((e) => e.id != id);
    console.log("when deleted cart data", cart.cartData);
    return rest_cart_data;
  };
  
  const addToCart = (cart, item) => {
     if(cart.cartData){
  
     }
    const temp = cart.cartData;
    let currentItem = { currentQuantity: 1, ...item };
    console.log("current  item", currentItem);
    temp.push(currentItem);
    return temp;
  };
  
  const incrementQuantity=(cart,id)=>{
  
    return cart.filter((el)=>el.id==id?el.currentQuantity++:el)
     
  }
  const decrementQuantity=(cart,id)=>{
  
    return cart.filter((el)=>el.id==id && el.currentQuantity>1?el.currentQuantity--:el)
     
  }
  
  const calulatePrice=(cart)=>{
    //  return cart.reduce((acc,e)=> (acc+e.price)*e.currentQuantity ,0)
  }