import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Badge, IconButton } from '@mui/material';
import CartIcon from '@mui/icons-material/LocalMall';

export default function CartButton() {
    let [count, setCount] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities);

    // console.log(user.cart_products)

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    return (
        <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={user.cart_total || 0} color="primary">
                <CartIcon />
            </Badge>
        </IconButton>
    )
}
