import { useState, useEffect } from "react";
import "../styles/Products.css";
import ProductCard from "../components/ProductCard";
import { ImageList } from "@mui/material";

export default function Home() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch('https://api.storerestapi.com/products?limit=8')
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
                    <ProductCard key={product.id || product._id} product={product} index={index} />
                ) )}
            </ImageList>

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
