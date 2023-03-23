import { Stack } from '@mui/system';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import { Avatar, Card, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.entities);
  let [count, setCount] = useState(1);

    useEffect(() => {
      dispatch(fetchUser())
  }, [dispatch]);

  function handleDeleteCartProduct(id) {
    console.log("delete", id)
  }

  function handleIncreaseQuantity(cart_product) {
    fetch(`/carts/${cart_product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({quantity: cart_product.quantity + 1})
    })
    .then((r) => r.json())
    .then((data) => console.log(data))
  }

  function handleDecreaseQuantity(cart_product) {
    fetch(`/carts/${cart_product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({quantity: cart_product.quantity - 1})
    })
    .then((r) => r.json())
    .then((data) => console.log(data))
  }

  if(!user || !user.carts_products || user.cart_total === 0) {
    return <h1>No Products in Cart</h1>
  }

  return (
    <Stack 
      direction="column"
      justifyContent="space-evenly"
      spacing={1}
      sx={{ 
          width: "100%",
          maxWidth: "600px",
          padding: 2
      }}
    >
      <List>
        {user.cart_products.map((cart_product) => {
          const cart_product_price_total = cart_product.product.price * cart_product.quantity

          return (
            <ListItem
              key={cart_product.product.id}
              secondaryAction={
                <Stack alignItems="flex-end">
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <IconButton 
                      aria-label="remove" 
                      disabled={cart_product.quantity < 2} 
                      // onClick={() => setCount(count -= 1)}
                      onClick={() => handleDecreaseQuantity(cart_product)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{cart_product.quantity}</Typography> 
                    <IconButton 
                      edge="end" 
                      aria-label="add" 
                      // onClick={() => setCount(count += 1)}
                      onClick={() => handleIncreaseQuantity(cart_product)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>

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
              <ListItemAvatar>
                <Avatar variant="square" sx={{ width: 80, height: 80, mr: 2 }} />
              </ListItemAvatar>
              <ListItemText 
                primary={cart_product.product.name} 
                secondary={`$${cart_product.product.price} * ${cart_product.quantity} = $${cart_product_price_total}`} 
              />
            </ListItem>
          )
        } )}
      </List>

      <Divider />
      
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography variant="h6" color="text.secondary" sx={{ mr: 1, textTransform: "uppercase" }}>Total:</Typography>
        <Typography variant="h5">${user.cart_price_total}</Typography>
      </Stack>
    </Stack>
  )
}