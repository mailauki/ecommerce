import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../features/products/productsSlice";
import "../styles/Products.css";
import ProductCard from "../components/ProductCard";
import ProfileCard from "../components/ProfileCard";
import { Box, ImageList, CardActionArea, ImageListItem, ImageListItemBar, Typography, IconButton } from "@mui/material";
import Container from "../components/Container";

export default function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.entities);
    const { loading } = useSelector((state) => state.products);
    const [apiProducts, setApiProducts] = useState([]);
    const moreProducts = products && products.length > 0 ? products.concat(apiProducts) : apiProducts

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

    const gridProducts = moreProducts.length > 0 ? moreProducts.slice(0, 3) : []
    const otherProducts = moreProducts.length > 3 ? moreProducts.slice(3) : []
    
    return (
        <>
        <ImageList variant="masonry" cols={2} gap={14} sx={{ width: "100%", p: 4, "a": { textDecoration: "none" } }}>
            {moreProducts.map((product, index) => {
                return <ProductCard key={product.index} product={product} index={index} />
            })}
        </ImageList>
            {/* <ImageList
                sx={{ width: "100%" }}
                variant="quilted" 
                cols={2}
                rowHeight={200}
            >
                {gridProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} grid />
                ) )}
            </ImageList> */}

            {/* <Box sx={{ width: "100%", overflowX: "scroll", mb: 10 }}>
                <ImageList
                    sx={{ 
                        width: `calc(200px * ${sliderProducts.length})`
                    }}
                    variant="quilted" 
                    cols={sliderProducts.length}
                    rowHeight={200}
                >
                    {sliderProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </ImageList>
            </Box> */}
            {/* <ImageList variant="masonry" cols={2} gap={14} sx={{ width: "100%", p: 4, "a": { textDecoration: "none" } }}>
                {otherProducts.map((product, index) => (
                    <CardActionArea 
                        key={index}
                        sx={{ mb: "14px" }} 
                        component={Link} to={product.id ? `/products/${product.id}` : "/"}
                    >
                        <ImageListItem style={{ marginBottom: 0 }}>
                            <img 
                                src={`https://picsum.photos/${index + 1}00/${index + 2}00`}
                                alt={product.name || product.title}
                                loading="lazy"
                                style={{ height: "380px" }}
                            />
                            <ImageListItemBar
                                className="product-info"
                                sx={{ alignItems: "center", textAlign: "left", p: 1 }}
                                title={
                                    <Typography sx={{ textTransform: "capitalize" }} noWrap>
                                        {product.name || product.title}
                                    </Typography>
                                }
                                subtitle={`@${product.createdBy ? product.createdBy.name : product.user.username}`}
                                actionIcon={<Typography variant="h6" sx={{ ml: 1 }}>{`$${product.price}`}</Typography>}
                                position="below"
                            />
                        </ImageListItem>
                    </CardActionArea>
                ))}
            </ImageList> */}
        </>
    )
}
