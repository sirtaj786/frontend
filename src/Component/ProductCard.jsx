import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add_cart_data } from '../Redux/cart.action';
import{Link} from "react-router-dom"

const ProductCard = ({data}) => {
  // console.log(data.mrp)
    const dispatch=useDispatch();
    const {cartData} = useSelector((store)=>store.CartReducer)
    // console.log("carddata",data)
   
  return (
    <>
     <Link to={`/details/${data.id}`} style={{textDecoration:"none"}}> <div className="product_card">
        <p className='product_title'>{data.name==""?"Fresh Vegitable&Fruits":data.name}</p>
      <img className='images' src={"https://images.alphacoders.com/768/thumb-1920-76811.jpg"}  alt=" image_it" />
         <div className="item_details">
            <p>Rs {data.mrp.mrp===null||0?234:data.mrp.mrp}</p>
            <button onClick={()=>{
               // for checking duplicate data
                let itemIndex=cartData.findIndex((e)=>e.id===data.id)
              
                if(itemIndex!==-1){
                  alert("Item is already in the Cart !")
                  return 
                }
                // if there is no duplicate item then add it to cart
               dispatch(add_cart_data(data));
               alert(`${data.name} Added in the Cart !`)
            }}>Add to Cart</button>
         </div>
     </div></Link>
    
    </>
  )
}

export default ProductCard