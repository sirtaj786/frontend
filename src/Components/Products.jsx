import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ReactPaginate from 'react-paginate';
import { Grid, Card, CardContent, Typography, CardActionArea, CardMedia } from "@material-ui/core";
import Pagination from "./Pagination";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const Products = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios
            .get(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${pageNumber}&search=${searchQuery}`)
            .then((response) => {
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages)
            })
            .catch((error) => {
                console.log(error);
            });
        fetchProducts()
    }, [pageNumber]);
    console.log(products)

    function handleSearchQueryChange(event) {
        setSearchQuery(event.target.value);
        setPageNumber(0);
    }

    console.log(searchQuery)
    async function fetchProducts() {
        setLoading(true)
        try {
            const response = await fetch(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${pageNumber}&search=${searchQuery}&category=${selectedCategory}&sort=${sortDirection === 'asc' ? 'mrp' : '-mrp'}`);
            const data = await response.json();
            const filteredProducts = selectedCategory === '' ? data.products : data.products.filter((product) =>
                product.category === selectedCategory
            );
            setProducts(filteredProducts);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.mesaage)

        }
        setLoading(false);


    }

    if (loading) {
        return <h1>Loading....</h1>
    }
    if (error) {
        return <h1>Error....</h1>
    }
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        setPageNumber(0); // reset page number when category changes
    }


    function addToCart(product) {
        const existingCartItem = cartItems.find(item => item.id === product.id);
        if (existingCartItem) {
            // If the product is already in the cart, update its quantity
            const updatedCartItems = cartItems.map(item => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } else {
            // If the product is not yet in the cart, add it with a quantity of 1
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    }

    function increaseQuantity(product) {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === product.id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    }

    function decreaseQuantity(product) {
        const existingCartItem = cartItems.find(item => item.id === product.id);
        if (existingCartItem.quantity === 1) {
            // If the quantity is already 1, remove the item from the cart
            const updatedCartItems = cartItems.filter(item => item.id !== product.id);
            setCartItems(updatedCartItems);
        } else {
            // If the quantity is greater than 1, decrease it by 1
            const updatedCartItems = cartItems.map(item => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        }
    }


    let p = "https://watermark.lovepik.com/photo/20211208/large/lovepik-fruits-and-vegetables-poster-picture_501615020.jpg"
    return (
        <>
            <input type="text" value={searchQuery} onChange={handleSearchQueryChange} placeholder="Search by product name" />
            <div style={{marginTop:"2rem"}}>
                <label>Filter by category:</label>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Biscuits & Cookies">Biscuits & Cookies</option>
                    <option value="Detergent powder & detergent">Detergent powder & detergent</option>
                    {/* // add additional categories here */}
                </select>
            </div>
            <div style={{marginTop:"2rem"}}>
                <button onClick={() => setSortDirection('asc')}>Sort by Price (Low to High)</button>
                <button onClick={() => setSortDirection('desc')}>Sort by Price (High to Low)</button>
            </div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>

                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={p}
                                            title={product.name}
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {product.description}
                                            </Typography>
                                            <Typography variant="h6">₹{product.mrp.mrp != 0 ? product.mrp.mrp : 215}</Typography>
                                            <div style={{ display: "flex", marginTop: "2rem",justifyContent:"space-between" }}>             
                                               <button  style={{backgroundColor:"green",border:"none",height:"2rem",borderRadius:"5px"}}onClick={() => addToCart(product)}>Add to Cart</button>
                                                {cartItems.some(item => item.id === product.id) && (
                                                    <div>
                                                        Quantity:
                                                        <button disabled={cartItems.find(item => item.id === product.id).quantity===1} onClick={() => decreaseQuantity(product)}>-</button>
                                                        {cartItems.find(item => item.id === product.id).quantity}
                                                        <button onClick={() => increaseQuantity(product)}>+</button>
                                                    </div>

                                                )}
                                            </div>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>

                        </Grid>
                    ))}
                </Grid>

                <Pagination
                    currentPage={pageNumber}
                    handlePageChange={(pageNumber) => setPageNumber(pageNumber)}
                    totalPages={totalPages}
                />
            </div>
        </>
    );
};

export default Products;