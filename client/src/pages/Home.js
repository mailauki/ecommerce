import { useState, useEffect } from "react";
import "../styles/Products.css";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        fetch('https://api.storerestapi.com/products/')
        .then((r) => r.json())
        .then((data) => setProducts(data.data))
    }, [])

    if(!products) return <h1>No Products</h1>

    const gridProducts = products.filter((product, index) => index < 3)
    const sliderProducts = products.filter((product, index) => index > 2)
    
    return (
        <>
            <div className="grid">
                {gridProducts.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>

            <div style={{ width: "100vw", overflow: "hidden" }}>
                <div className="slider">
                    {sliderProducts.map((product, index) => <ProductCard key={product._id} product={product} index={index} />)}
                </div>
            </div>
        </>
    )
}
