import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import { Badge, IconButton } from '@mui/material';
import CartIcon from '@mui/icons-material/LocalMall';

export default function CartButton() {
    let [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities);

    // console.log(user.cart_products)

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    return (
        <IconButton onClick={() => setCount(count+=1)}>
            <Badge badgeContent={user.cart_products.length || 0} color="primary">
                <CartIcon />
            </Badge>
        </IconButton>
    )
}
