import { Stack } from '@mui/system';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import { Avatar, Card, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.entities);

    useEffect(() => {
      dispatch(fetchUser())
  }, [dispatch]);

  if(!user || !user.cart_products || user.cart_total === 0) {
    return <h1>No Products in Cart</h1>
  }

  console.log(user)

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
        {user.cart_products.map((product) => (
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar variant="square" sx={{ width: 80, height: 80, mr: 2 }} />
            </ListItemAvatar>
            <ListItemText primary={product.name} secondary={`$${product.price}`} />
          </ListItem>
        ))}
      </List>

      <Divider />
      
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography variant="h6" color="text.secondary" sx={{ mr: 1, textTransform: "uppercase" }}>Total:</Typography>
        <Typography variant="h5">${user.cart_price_total}</Typography>
      </Stack>
    </Stack>
  )
}