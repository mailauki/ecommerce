import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import { logout } from '../features/user/userSlice';
import { Button, Typography, Stack, ImageList, ImageListItem, ImageListItemBar, CardActionArea } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileIcon from '@mui/icons-material/Person';
import RemoveAccountIcon from '@mui/icons-material/PersonOff';
import AddIcon from '@mui/icons-material/Add';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities);
    const errors = useSelector((state) => state.user.errors);
    // console.log(user)

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
        <Stack 
            direction="column"
            justifyContent="space-evenly"
            spacing={1}
            sx={{ 
                width: "100%",
                maxWidth: "800px"
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
            >
                <Typography variant="h5">{user.username}</Typography>

                <Stack>
                    <Typography variant="body2">Products</Typography>
                    <Typography variant="h6">0</Typography>
                </Stack>

                <Button 
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Stack>

            <Stack direction="row" justifyContent="space-evenly">
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link} to="/products/add"
                >
                    Add Product
                </Button>

                <Stack direction="column" spacing={1}>
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
                </Stack>
            </Stack>

            <ImageList variant="masonry" cols={3} gap={8} sx={{ padding: 4 }}>
                {user.products.map((product) => (
                    <CardActionArea 
                        key={product.id}
                        sx={{ 
                            "&:hover": { ".product-info": { display: "flex" } }, 
                            mb: "8px"
                        }} 
                        component={Link} to={`/products/${product.id}`}
                    >
                        <ImageListItem style={{ marginBottom: 0 }}>
                            <img 
                                src={product.images ? product.images[0].url : `https://dummyimage.com/640x640/ccc/555/&text=${product.name}`}
                                alt={product.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                className="product-info"
                                sx={{
                                    background:
                                        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                                    display: "none"
                                }}
                                title={product.name}
                                position="top"
                            />
                        </ImageListItem>
                    </CardActionArea>
                ))}
            </ImageList>
        </Stack>
    )
}