import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../features/user/currentUserSlice';
import { AppBar, Toolbar, Typography, Avatar, Button, IconButton } from '@mui/material';
import CartButton from './CartButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentUser.entities);

    useEffect(() => {
        dispatch(fetchCurrentUser())
    }, [dispatch]);

    return (
        <AppBar position="static" color="divider">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    component={Link} to="/" 
                    sx={{ 
                        flexGrow: 1, 
                        textAlign: "left", 
                        "&:hover": { textDecoration: "none", color: "primary.main" } 
                    }}
                >
                    E-Commerce
                </Typography>

                {user ? (
                    <>
                        <CartButton />

                        <IconButton component={Link} to="/me">
                            <Avatar 
                                alt={user.username || "username"}
                                src=""
                                sx={{ width: 24, height: 24 }} 
                            />
                        </IconButton>
                    </>
                ) : (
                    <Button 
                        component={Link} to="/login" 
                        // variant="contained"
                        sx={{ display: pathname === "/login" || pathname === "/signup" ? "none" : "" }}
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}
