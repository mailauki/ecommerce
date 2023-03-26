import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from "../features/products/productSlice";
import { fetchCurrentUser, addCart } from "../features/user/currentUserSlice";
import { Link, useParams } from "react-router-dom";
import { Avatar, Box, Button, ListItem, ListItemButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function Product() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.entities);
    const { loading } = useSelector((state) => state.product);
    const user = useSelector((state) => state.currentUser.entities);
    const [image, setImage] = useState("https://dummyimage.com/640x640/ccc/555/&text=image");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [disableCart, setDisableCart] = useState(false)

    const handleImageClick = (image, index) => {
        setSelectedIndex(index)
    }

    useEffect(() => {
        if(id) {
            dispatch(fetchProductById(id))
        }
        dispatch(fetchCurrentUser())
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
        } else {
            setDisableCart(true)
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
        .then((data) => {
            console.log(data)
            dispatch(addCart(data))
        })
    }


    if(!product && !loading) return <h1>No Product</h1>
    else if(loading) return <h1>Loading...</h1>

    return (
        <Box 
            sx={{ 
                width: "100%", 
                maxWidth: "1200px", 
                p: 2, 
                mt: "65px",
                textAlign: "left"
            }}
            className="Product"
        >
            <Stack 
                direction="row" 
                sx={{ flexGrow: 2 }} 
                className="product-images"
            >
                <img 
                    src={image} 
                    alt={product.name} 
                    style={{ 
                        height: "100%", 
                        maxHeight: "80vh", 
                        width: "calc(100% - 112px)", 
                        objectFit: "contain" 
                    }} 
                />
                
                {product.images.length > 1 ? (
                    <Stack 
                        direction="column" 
                        flexWrap="wrap" 
                        alignItems="center"
                        justifyContent="flex-start"
                        className="images"
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

            <Stack sx={{ p: 2, flexGrow: 1, minWidth: "350px" }}>
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
                        disabled={user ? product.user.id === user.id : true}
                        sx={{ display: user ? product.user.id === user.id ? "" : "none" : "none" }}
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
                        {disableCart ? user ? "In Cart" : "No Cart" : "Add to Cart"}
                    </Button>
                </Stack>

                <Typography variant="body1" paragraph>
                    {product.description}
                </Typography>
            </Stack>
        </Box>
    )
}
