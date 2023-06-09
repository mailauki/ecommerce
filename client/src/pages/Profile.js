import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import { fetchCurrentUser } from '../features/user/currentUserSlice';
import { logout } from '../features/user/currentUserSlice';
import ProfileCard from '../components/ProfileCard';
import Container from '../components/Container';
import DeleteDialog from '../components/DeleteDialog';
import { Button, Typography, Stack, ImageList, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileIcon from '@mui/icons-material/Person';
import RemoveAccountIcon from '@mui/icons-material/PersonOff';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Profile() {
    const { id } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userType, setUserType] = useState("currentUser");
    const user = useSelector((state) => state[userType].entities);
    const currentUser = useSelector((state) => state.currentUser.entities);
    const errors = useSelector((state) => state.user.errors);
    const [disableButtons, setDisableButtons] = useState(false);
    const [open, setOpen] = useState(false);
    const mobile = useMediaQuery('(max-width:500px)');

    useEffect(() => {
        if(pathname === "/me") {
            dispatch(fetchCurrentUser())
            setUserType("currentUser")
        } 
        if(id) {
            dispatch(fetchUser(id))
            setUserType("user")
        }
    }, [dispatch, pathname, id])

    useEffect(() => {
        if(currentUser && user) {
            const disable = user.id === currentUser.id || pathname === "/me"
            if(disable) {
                setDisableButtons(false)
            } else {
                setDisableButtons(true)
            }
        } else {
            setDisableButtons(true)
        }
    }, [user, currentUser, pathname])

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        })
        .then((r) => {
            if(r.ok) {
                dispatch(logout())
            }
        })
        navigate("/")
    }

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleDelete() {
        setOpen(false)

        fetch(`/users/${user.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        handleLogout()
    }

    if(errors) {
        return (
            <Container>
                <Typography variant="h4">{errors.map((err) => err)}</Typography>
            </Container>
        )
    }
    if(!user || user.error) {
        return (
            <Container>
                <Typography variant="h4">No User Found</Typography>
            </Container>
        )
    }

    return (
        <>
            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                        <Avatar 
                            src={user.avatar || ""} 
                            alt="avatar" 
                            sx={{ width: 120, height: 120, m: 2 }} 
                        />

                    
                        {mobile ? (
                            <Stack sx={{ flexGrow: 1 }} alignItems="center">
                                <Stack direction="row" alignItems="center" justifyContent="space-evenly" sx={{ width: "100%" }}>
                                    <Typography variant="h5">@{user.username}</Typography>

                                    <Stack>
                                        <Typography variant="body2" color="text.secondary">Products</Typography>
                                        <Typography variant="h6">{user.products_total || 0}</Typography>
                                    </Stack>
                                </Stack>

                                <Button 
                                    variant="outlined"
                                    startIcon={<LogoutIcon />}
                                    onClick={handleLogout}
                                    sx={{ opacity: disableButtons ? 0 : 1 }}
                                >
                                    Logout
                                </Button>
                            </Stack>
                        ) : (
                            <>
                                <Typography variant="h5">@{user.username}</Typography>

                                <Stack>
                                    <Typography variant="body2" color="text.secondary">Products</Typography>
                                    <Typography variant="h6">{user.products_total || 0}</Typography>
                                </Stack>

                                <Button 
                                    variant="outlined"
                                    startIcon={<LogoutIcon />}
                                    onClick={handleLogout}
                                    sx={{ opacity: disableButtons ? 0 : 1 }}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                </Stack>

                <Stack 
                    direction="row" 
                    spacing={1}
                    justifyContent="space-between"
                    sx={{ display: disableButtons ? "none" : "" }}
                >
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
                            component={Link} to={`/users/${user.id}/update`}
                        >
                            Update Profile
                        </Button>

                        <Button 
                            variant="contained" 
                            color="error"
                            startIcon={<RemoveAccountIcon />}
                            onClick={handleOpen}
                        >
                            Delete Account
                        </Button>
                    </Stack>
                </Stack>

                <ImageList variant="masonry" cols={3} gap={8} sx={{ padding: 4 }}>
                    {user.products && user.products.length > 0 ? (
                        user.products.map((product) => (
                            <ProfileCard key={product.id} product={product} />
                        ))
                    ) : (
                        <></>
                    )}
                </ImageList>
            </Container>

            <DeleteDialog type="account" open={open} handleClose={handleClose} handleDelete={handleDelete} />
        </>
    )
}