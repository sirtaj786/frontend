import { PRODUCT_ERROR, PRODUCT_FILTER, PRODUCT_LOADING, PRODUCT_SEARCH, PRODUCT_SUCESS, SINGLE } from "./product.action.type"
import axios from "axios"

 export const getProduct=(params)=>(dispatch)=>{
          dispatch(productLoading())
        
             fetch(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${params}`)
              .then(res => res.json())
              .then(res=>{ dispatch(productSuccess(res.products))
                console.log("action ",res)
            }).catch((err)=>{
                  dispatch(productError())
            })
            
        
 }
 export const getproductDetail = (dispatch,id) => {
    dispatch(productLoading());
    console.log("INSIDE SINGLE ACTIOPN")
    axios
      .get(
        `https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products&id=${id}`
      )
      .then((res) => {
        dispatch({ type: SINGLE,payload: id });
      })
      .catch((err) => dispatch(productError()));
  };
 export const productLoading=()=>({type:PRODUCT_LOADING})
 export const productSuccess=(payload)=>({type:PRODUCT_SUCESS ,payload})
 export const productError=()=>({type:PRODUCT_ERROR});
 export const product_filter=(payload)=>({type:PRODUCT_FILTER,payload})
 export const product_search=(payload)=>({type:PRODUCT_SEARCH,payload})