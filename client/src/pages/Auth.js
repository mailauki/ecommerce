import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Auth.css";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Auth() {
    const { pathname } = useLocation()
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    function handleAuth(event) {
        event.preventDefault()

        pathname === "/login" ? (
            console.log("login", formData)
        ) : (
            console.log("signup", formData)
        )
    }

    return (
        <>
            <form className="Auth" onSubmit={handleAuth}>
                <TextField 
                    label="Username" 
                    margin="normal" 
                    value={formData.username} 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
                <TextField 
                    label="Password" 
                    type={showPassword ? 'text' : 'password'}
                    margin="normal" 
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    InputProps={{ 
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment> 
                    }}
                />

                <Button variant="contained" type="submit" className="submit">
                    {pathname === "/login" ? "Login" : "Signup"}
                </Button>

                {pathname === "/login" ? (
                    <Link to="/signup">
                        <p>Don't have an account? Sign up</p>
                    </Link>
                ) : (
                    <Link to="/login">
                        <p>Already have an account? Login</p>
                    </Link>
                )}
            </form>
        </>
    )
}
