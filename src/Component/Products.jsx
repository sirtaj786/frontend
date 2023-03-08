import React, { useEffect } from 'react'
import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import { getProduct, product_search } from '../Redux/product.action'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Pagination } from '@mui/material'
// const getProduct=({page=1})=>{
//     return fetch(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${page}`).then((res)=>
//     res.json()
//     )

// }


const Products = () => {
    const[page,setPage]=useState(1)
    const dispatch=useDispatch()
    const[products,setProducts]=useState([])
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [searchInput, setSearchInput] = useState("")
    const {fetchedData,loading,error,filterData}=useSelector((store)=>store.productReducer)
    
    const { cartData } = useSelector((store) => store.CartReducer)
    const mappingData = filterData.length ? filterData : fetchedData


  console.log("fetchedData.totalPages",fetchedData.length)
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 400 },
        { field: 'price', headerName: 'Price', width: 120 },
        {
            field: 'image',
            headerName: 'Image',
            width: 120,
            renderCell: (params) => (
              <img src={params.row.image} alt={params.row.name} style={{ width: '100%', height: '100%' }} />
            ),
          },
      ];
    //   console.log("data",fetchedData)


useEffect(() => {
    dispatch(getProduct(page))
}, [dispatch])
// console.log(products)
const selectCategoryHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
        setSelectedCategory([...selectedCategory, value]);

    }
    else {
        setSelectedCategory([...selectedCategory.filter((e) => e !== value)])
    }
}


const searchDataHandler = () => {

    dispatch(product_search(searchInput.split(" ")))

}
const searchOnKeyPress = (e) => {
    if (e.key === "Enter") {
        dispatch(product_search(searchInput.split(" ")))
    }
}
  return (
    <div>
       {/* <DataGrid rows={fetchedData} columns={columns} pageSize={5}/> */}
       <div id="navBar">
               
            </div>


            <div className="searchDiv">
                <input type="text" placeholder='Search by Brand...' onChange={(e) => {
                    setSearchInput(e.target.value)
                }} onKeyPress={searchOnKeyPress} />
                <div className="searchIconDiv" onClick={searchDataHandler}>
                    < SearchOutlinedIcon style={{marginTop:"0.5rem"}} />
                </div>
            </div>

            <div className="contentDiv">
                <div className='filter_div'>
                    <div className="checkBoxDiv">
                        <h4>Category</h4>
                        <h5>Fruits & Vegitables</h5>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'Red'} /> <label htmlFor="">Cuts & Sprouts</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={"Blue"} /> <label htmlFor="">Exiotics& Veggies</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'Green'} /> <label htmlFor="">Flower Bouquets</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'Green'} /> <label htmlFor="">Fresh Fruits</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'Green'} /> <label htmlFor="">Fresh Vegitables</label>
                        </div>
                    </div>
                   
                    <div className="checkBoxDiv">
                        <h4>Price</h4>
                        <select onChange={selectCategoryHandler} style={{width:"16rem",height:"2rem"}}>
                            <option>Sort price</option>
                        <option value='lth'>
                            Low to high
                            </option>
                            <option value='htl'>
                            High to Low
                        </option>
                        </select>
                        
                     
                       
                    </div>
                    

                </div>
                <div className='product_list_div'>
                    {
                        loading ? <img className='loaderImg' src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' alt='loadimg' /> : error ? <img className='loaderImg' src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' alt='loadimg' /> : mappingData.map((data) => {
                            return (
                                <ProductCard data={data} key={data.id} />
                            )
                        })
                    }



                </div>
               
            </div>
            <div style={{marginLeft:"40rem"}}>
            <Pagination currentPage={page}
      handlePageChange={(page)=>setPage(page)}
      totalPages={fetchedData.length} />
      </div>
        
    </div>
  )
}

export default Products