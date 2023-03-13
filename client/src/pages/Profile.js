import { useSelector} from 'react-redux';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import RemoveAccountIcon from '@mui/icons-material/PersonOff';

export default function Profile() {
    const user = useSelector((state) => state.user.entities);

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        })
        .then((r) => {
            if(r.ok) {
                alert("Logged Out")
            }
        })
    }

    if(!user) return <h1>No User Found</h1>
    console.log(user)

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