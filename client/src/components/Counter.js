import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../features/user/userSlice';
import { Stack, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Counter({ cart_product }) {
  const dispatch = useDispatch();

  function handleIncreaseQuantity(cart_product) {
    fetch(`/carts/${cart_product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({quantity: cart_product.quantity + 1})
    })
    .then((r) => r.json())
    .then((data) => {
      dispatch(increaseQuantity(data.id))
    })
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
    .then((data) => {
      dispatch(decreaseQuantity(data.id))
    })
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <IconButton 
        aria-label="remove" 
        disabled={cart_product.quantity < 2} 
        onClick={() => handleDecreaseQuantity(cart_product)}
      >
        <RemoveIcon />
      </IconButton>
      <Typography>{cart_product.quantity}</Typography> 
      <IconButton 
        edge="end" 
        aria-label="add" 
        onClick={() => handleIncreaseQuantity(cart_product)}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  )
}