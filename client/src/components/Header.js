// import '../styles/Header.css';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Box, Button, IconButton } from '@mui/material';
import CartButton from './CartButton';

export default function Header() {
    const { pathname } = useLocation()

    return (
        <div className="Header">
            <Box sx={{ "&:hover": { color: "primary.main" }}}>
                <Link to="/">
                    <h3>Header</h3>
                </Link>
            </Box>
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
                    variant="contained"
                    sx={{ display: pathname === "/login" || pathname === "/signup" ? "none" : "" }}
                >
                    Login
                </Button>
            )}
        </div>
    )
}
