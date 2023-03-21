import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from "../features/products/productSlice";
import { Link, useParams } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function Product() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.entities);
    const { loading } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [dispatch, id])


    if(!product && !loading) return <h1>No Product</h1>
    else if(loading) return <h1>Loading...</h1>

    const image = product.images ? product.images[0].url : `https://dummyimage.com/640x640/ccc/555/&text=${product.name || "image"}`

    return (
        <Stack sx={{ width: "100%", maxWidth: "600px", textAlign: "left" }}>
            <img src={image} alt={product.name} style={{ height: "200px", objectFit: "contain" }} />

            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-evenly"
            >
                <Typography variant="h4">{product.name}</Typography>

                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    component={Link} to={`/products/${id}/update`}
                >
                    Edit
                </Button>
            </Stack>

            <Typography 
                variant="subtitle1" 
                component={Link} to={`/users/${product.user.id}`}
            >
                From: {product.user.username}
            </Typography>

            <Typography variant="body1" paragraph>{product.description}</Typography>
        </Stack>
    )
}
