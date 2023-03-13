import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import { logout } from '../features/user/userSlice';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import RemoveAccountIcon from '@mui/icons-material/PersonOff';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities);
    const errors = useSelector((state) => state.user.errors);

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
        <>
            <h1>ID: {user.id}</h1>
            <h2>Username: {user.username}</h2>
            <Button 
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
            >
                Logout
            </Button>
            <br />
            <Button 
                variant="contained" 
                color="error"
                startIcon={<RemoveAccountIcon />}
            >
                Delete Account
            </Button>
        </>
    )
}