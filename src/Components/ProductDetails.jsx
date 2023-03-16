import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  image: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
}));

const ProductDetails = () => {
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    axios
      .get(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products/${id}`)
      .then((response) => {
        console.log("response",response)
        setProduct(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!product) {
    return null;
  }
  let p="https://watermark.lovepik.com/photo/20211208/large/lovepik-fruits-and-vegetables-poster-picture_501615020.jpg"

  return (
    <>
    <Paper className={classes.root}>
      <img src={p} alt={product.name} className={classes.image} />
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {product.description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Price: ${product.price}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Category: {product.category}
      </Typography>
    </Paper>
    </>
  );
};

export default ProductDetails;