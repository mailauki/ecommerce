import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, removeCart } from '../features/user/currentUserSlice';
import "../styles/Form.css";
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, Stack, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CartIcon from '@mui/icons-material/LocalMall';
import Container from '../components/Container';
import Counter from '../components/Counter';

export default function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser.entities);

    useEffect(() => {
      dispatch(fetchCurrentUser())
  }, [dispatch]);

  function handleDeleteCartProduct(id) {
    fetch(`/carts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    dispatch(removeCart(id))
  }

  function handleCheckout() {
    if(user.carts && user.carts.length > 0) {
      user.carts.map((cart_product) => {
        fetch(`/carts/${cart_product.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
        return dispatch(removeCart(cart_product.id))
      })
    }
  }

  if(!user || !user.carts || user.cart_total === 0) {
    return (
      <Container>
        <Typography variant="h4">Cart is Empty</Typography>
      </Container>
    )
  }

  return (
    <>
      <Container>
        <List sx={{ mb: "140px" }}>
          {user.carts.map((cart_product) => {
            const cart_product_price_total = (cart_product.product.price * cart_product.quantity).toFixed(2)

            return (
              <ListItem
                key={cart_product.product.id}
                disablePadding
                secondaryAction={
                  <Stack alignItems="flex-end">
                    <Counter cart_product={cart_product} />

                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleDeleteCartProduct(cart_product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemButton 
                  component={Link} to={`/products/${cart_product.product.id}`}
                >
                  <ListItemAvatar>
                    <Avatar 
                      variant="square" 
                      sx={{ width: 80, height: 80, mr: 2 }} 
                      src={cart_product.product.images && cart_product.product.images.length > 0 ? cart_product.product.images[0].url : ""} 
                      alt={cart_product.product.name}
                    >
                      <CartIcon sx={{ fontSize: 34 }} />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText 
                    primary={cart_product.product.name} 
                    secondary={`$${cart_product.product.price} * ${cart_product.quantity} = $${cart_product_price_total}`} 
                  />
                </ListItemButton>
              </ListItem>
            )
          } )}
        </List>
      </Container>
      
      <Box 
        sx={{ 
          position: "fixed", 
          bottom: 0, 
          width: "100%", 
          maxWidth: "600px", 
          pb: "50px", 
          bgcolor: "background.default" 
        }}
      >
        <Divider />
      
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ mr: 1, textTransform: "uppercase" }}
          >
            Total:
          </Typography>
          <Typography variant="h5">${user.cart_price_total}</Typography>
        </Stack>

        <Stack>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ m: 2, p: 2, fontSize: 18 }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Stack>
      </Box>
    </>
  )
}