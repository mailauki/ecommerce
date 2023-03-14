import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import { logout } from '../features/user/userSlice';
import { Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileIcon from '@mui/icons-material/Person';
import RemoveAccountIcon from '@mui/icons-material/PersonOff';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities);
    const errors = useSelector((state) => state.user.errors);
    console.log(user)

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        })
        .then((r) => {
            if(r.ok) {
                alert("Logged Out")
                dispatch(logout())
            }
            dispatch(fetchUser())
        })
    }

    if(errors) return <h1>{errors.map((err) => err)}</h1>
    else if(!user) return <h1>No User Found</h1>

    return (
        <Box 
            sx={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-evenly", 
                button: { margin: 1 }, 
                width: "100%"
            }}
        >
            <Box 
                sx={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    alignItems: "center", 
                    justifyContent: "space-evenly" 
                }}
            >
                <Typography variant="h5">{user.username}</Typography>
                <Box>
                    <Typography variant="body2">Products</Typography>
                    <Typography variant="h6">0</Typography>
                </Box>
                <Button 
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link} to="/products/add"
                >
                    Add Product
                </Button>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Button 
                        variant="outlined"
                        startIcon={<ProfileIcon />}
                    >
                        Update Profile
                    </Button>
                    <Button 
                        variant="contained" 
                        color="error"
                        startIcon={<RemoveAccountIcon />}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}