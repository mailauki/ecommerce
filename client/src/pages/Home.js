import { useState, useEffect } from "react";
import "../styles/Products.css";
import ProductCard from "../components/ProductCard";
import { Box, ImageList } from "@mui/material";

export default function Home() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch('https://api.storerestapi.com/products?limit=10')
        .then((r) => r.json())
        .then((data) => setProducts(data.data))
    }, [])

    if(!products) return <h1>No Products</h1>

    const gridProducts = products.filter((product, index) => index < 3)
    const sliderProducts = products.filter((product, index) => index > 2)
    
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

            {/* <div className="grid">
                {gridProducts.map((product) => <ProductCard key={product._id} product={product} />)}
            </div> */}

            {/* <div style={{ width: "100vw", overflow: "hidden" }}>
                <div className="slider">
                    {sliderProducts.map((product, index) => <ProductCard key={product._id} product={product} index={index} />)}
                </div>
            </div> */}
        </>
    )
}
