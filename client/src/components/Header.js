// import '../styles/Header.css';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Avatar, Box, Button, IconButton } from '@mui/material';
import CartButton from './CartButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    const { pathname } = useLocation()

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
                    Header
                </Typography>

                {false ? (
                    <>
                        <CartButton />

                        <IconButton>
                            <Avatar 
                                alt="username"
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
