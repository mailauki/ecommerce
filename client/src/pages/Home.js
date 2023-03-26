import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../features/products/productsSlice";
import { fetchCategories } from "../features/categories/categoriesSlice";
import "../styles/Products.css";
import ProductCard from "../components/ProductCard";
import { ImageList, Box, Stack, Chip } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.entities);
    const categories = useSelector((state) => state.categories.entities);
    const { loading } = useSelector((state) => state.products);
    const [selected, setSelected] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // const [apiProducts, setApiProducts] = useState([]);
    // const moreProducts = products && products.length > 0 ? products.concat(apiProducts) : apiProducts
    const matches = useMediaQuery('(max-width:500px)');

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [dispatch])

    // useEffect(() => {
    //     fetch('https://api.storerestapi.com/products')
    //     .then((r) => r.json())
    //     .then((data) => setApiProducts(data.data))
    // }, [])

    useEffect(() => {
        if(products) {
            if(selected === 0) {
                setFilteredProducts(products)
            } else {
                setFilteredProducts(products.filter((product) => product.categories.find(category => category.id === selected)))
            }
        }
    }, [products, selected])

    if(!products && !loading) return <h1>No Products</h1>
    if(loading) return <h1>Loading...</h1>
    
    return (
        <Box sx={{ width: "100%", mt: "65px", mb: "30px", p: 4 }}>
            <Stack direction="row" spacing={1}>
                <Chip 
                    key={0} 
                    label="all" 
                    onClick={() => setSelected(0)} 
                    variant={selected === 0 ? "filled" : "outlined"} 
                    sx={{ minWidth: "60px" }}
                />
                {categories.map((category) => (
                    <Chip 
                        key={category.id} 
                        label={category.name} 
                        onClick={() => setSelected(category.id)} 
                        variant={selected === category.id ? "filled" : "outlined"} 
                        sx={{ minWidth: "60px" }}
                    />
                ) )}
            </Stack>

            <ImageList 
                variant="masonry" 
                cols={matches ? 1 : 2} 
                gap={14} 
                sx={{ 
                    width: "100%", 
                    "a": { textDecoration: "none" } 
                }}
            >
                {filteredProducts.map((product, index) => {
                    return <ProductCard key={product.index} product={product} index={index} />
                })}
            </ImageList>
        </Box>
    )
}
