import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from "../features/products/productSlice";
import { fetchUser } from "../features/user/userSlice";
import { Link, useParams } from "react-router-dom";
import { Avatar, Button, ListItem, ListItemButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Container from "../components/Container";

export default function Product() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.entities);
    const { loading } = useSelector((state) => state.product);
    const user = useSelector((state) => state.user.entities);
    const [image, setImage] = useState("https://dummyimage.com/640x640/ccc/555/&text=image");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [disableCart, setDisableCart] = useState(false)

    const handleImageClick = (image, index) => {
        setSelectedIndex(index)
    }

    useEffect(() => {
        dispatch(fetchProductById(id))
        dispatch(fetchUser())
    }, [dispatch, id])

    useEffect(() => {
        if(product) {
            if(product.name) {
                setImage(`https://dummyimage.com/640x640/ccc/555/&text=${product.name}`)
            }
            if(product.images && product.images.length > 0) {
                setImage(product.images[0].url)

                if(product.images.length > 1) {
                    setImage(product.images[selectedIndex].url)
                }
            }
        }
    }, [product, selectedIndex])

    useEffect(() => {
        if(user) {
            const disableAddToCart = user.carts.find((cart) => cart.product.id === parseInt(id))
            if(disableAddToCart) {
                setDisableCart(true)
            } else {
                setDisableCart(false)
            }
            // 
        }
    }, [id, user])

    function handleAddToCart() {
        fetch("/carts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({product_id: id, quantity: 1})
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    }


    if(!product && !loading) return <h1>No Product</h1>
    else if(loading) return <h1>Loading...</h1>

    return (
        <Container align="left">
            <Stack>
                <img 
                    src={image} 
                    alt={product.name} 
                    style={{ height: "200px", objectFit: "contain" }} 
                />
                
                {product.images.length > 1 ? (
                    <Stack 
                        direction="row" 
                        flexWrap="wrap" 
                        alignItems="center"
                        justifyContent="center"
                        sx={{ mt: 1, mb: 1 }}
                    >
                        {product.images.map((image, index) => (
                            <ListItem 
                                key={image.id} 
                                disablePadding 
                                sx={{ width: "fit-content" }}
                            >
                                <ListItemButton 
                                    sx={{ width: "fit-content" }} 
                                    selected={selectedIndex === index}
                                    onClick={() => handleImageClick(image, index)}
                                >
                                    <Avatar 
                                        variant="square" 
                                        sx={{ width: 80, height: 80 }} 
                                        src={image.url}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </Stack>
                ) : (
                    <></>
                )}
            </Stack>

            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
            >
                <Typography variant="h4">{product.name}</Typography>

                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    component={Link} to={`/products/${id}/update`}
                    disabled={product.user.id !== user.id}
                    sx={{ display: product.user.id !== user.id ? "none" : "" }}
                >
                    Edit
                </Button>
            </Stack>

            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
            >
                <Stack>
                    <Typography variant="h6">${product.price.toFixed(2)}</Typography>

                    <Typography 
                        variant="subtitle1" 
                        color="text.secondary"
                        component={Link} to={`/users/${product.user.id}`}
                    >
                        @{product.user.username}
                    </Typography>

                </Stack>

                <Button 
                    variant="outlined" 
                    disabled={disableCart}
                    onClick={handleAddToCart}
                >
                    {disableCart ? "In Cart" : "Add to Cart"}
                </Button>
            </Stack>

            <Typography variant="body1" paragraph>{product.description}</Typography>
        </Container>
        // </Stack>
    )
}
