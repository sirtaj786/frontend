import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {ProductDetails} from './ProductDetails'
import Products from './Products'

const MainRoute = () => {
  return (
    <div>
        <Products/>
        <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/details/:id" element={<ProductDetails/>}/>
        </Routes>
    </div>
  )
}

export default MainRoute