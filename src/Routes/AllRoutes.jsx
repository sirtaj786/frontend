import { Route, Router } from "react-router-dom";
import ProductDetails from "../Components/ProductDetails";
import React, { lazy, Suspense } from 'react';
// import Products from "../Components/Products";
const Products = lazy(() => import('./Products'));

function AllRoutes() {
    return (
      <Router>
        {/* Your application components go here */}
        <Suspense fallback={<div>Loading...</div>}>
       <Route path="/products" element={<Products/>}/>
       </Suspense>
       <Route path="/products/:id" element={<ProductDetails/>}/>

      </Router>
    );
  }
  export default AllRoutes