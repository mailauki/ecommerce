import { Button } from "@mui/material"

export default function Profile({ user }) {
    if(!user) return <h1>No User Found</h1>

    return (
        <>
            <h1>ID: {user.id}</h1>
            <h2>Username: {user.username}</h2>
            <Button variant="outlined">Logout</Button>
            <Button variant="contained" color="error">Delete Account</Button>
        </>
    )
}