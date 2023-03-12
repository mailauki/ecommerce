import { useState } from "react";
import "../styles/Login.css";
import { Button, TextField } from "@mui/material";

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" })

    function handleLogin(event) {
        event.preventDefault()

        console.log(formData)
    }

    return (
        <>
            <h1>Login</h1>
            <form className="Login" onSubmit={handleLogin}>
                <TextField 
                    label="Username" 
                    margin="normal" 
                    value={formData.username} 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
                <TextField 
                    label="Password" 
                    type="password" 
                    margin="normal" 
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </>
    )
}