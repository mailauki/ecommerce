import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../features/products/productsSlice";
import "../styles/Products.css";
import ProductCard from "../components/ProductCard";
import { ImageList,  } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.entities);
    const { loading } = useSelector((state) => state.products);
    const [apiProducts, setApiProducts] = useState([]);
    const moreProducts = products && products.length > 0 ? products.concat(apiProducts) : apiProducts
    const matches = useMediaQuery('(max-width:500px)');

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    useEffect(() => {
        fetch('https://api.storerestapi.com/products')
        .then((r) => r.json())
        .then((data) => setApiProducts(data.data))
    }, [])

    if(!products && !loading) return <h1>No Products</h1>
    if(loading) return <h1>Loading...</h1>
    
    return (
        <>
            <ImageList 
                variant="masonry" 
                cols={matches ? 1 : 2} 
                gap={14} 
                sx={{ 
                    width: "100%", 
                    mt: "65px", 
                    mb: "30px",
                    p: 4, 
                    "a": { textDecoration: "none" } 
                }}
            >
                {moreProducts.map((product, index) => {
                    return <ProductCard key={product.index} product={product} index={index} />
                })}
            </ImageList>
        </>
    )
}
