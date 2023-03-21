import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../features/products/productsSlice";
import "../styles/Products.css";
import ProductCard from "../components/ProductCard";
import { Box, ImageList } from "@mui/material";

export default function Home() {
    // const [products, setProducts] = useState(null);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.entities);
    const { loading } = useSelector((state) => state.products);

    // useEffect(() => {
    //     fetch('https://api.storerestapi.com/products?limit=10')
    //     .then((r) => r.json())
    //     .then((data) => setProducts(data.data))
    // }, [])

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if(!products && !loading) return <h1>No Products</h1>
    if(loading) return <h1>Loading...</h1>

    const gridProducts = products.length > 0 ? products.slice(0, 3) : []
    const sliderProducts = products.length > 0 ? products.slice(3) : []
    
    return (
        <>
            <ImageList
                sx={{ width: "100%" }}
                variant="quilted" 
                cols={2}
                rowHeight={200}
            >
                {gridProducts.map((product, index) => (
                    <ProductCard key={product.id || product._id} product={product} index={index} grid />
                ) )}
            </ImageList>

            <Box sx={{ width: "100%", overflowX: "scroll" }}>
                <ImageList
                    sx={{ 
                        width: `calc(200px * ${sliderProducts.length})`
                    }}
                    variant="quilted" 
                    cols={sliderProducts.length}
                    rowHeight={200}
                >
                    {sliderProducts.map((product, index) => (
                        <ProductCard key={product.id || product._id} product={product} index={index} />
                    ))}
                </ImageList>
            </Box>
        </>
    )
}
