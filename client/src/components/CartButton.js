import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../features/user/currentUserSlice';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Badge, IconButton } from '@mui/material';
import CartIcon from '@mui/icons-material/LocalMall';

export default function CartButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentUser.entities);

    useEffect(() => {
        dispatch(fetchCurrentUser())
    }, [dispatch]);

    return (
        <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={user.cart_total || 0} color="primary">
                <CartIcon />
            </Badge>
        </IconButton>
    )
}
