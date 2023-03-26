import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Form.css";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Container from "../components/Container";

export default function Auth() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState([])

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    console.log(errors)

    function handleAuth(event) {
        event.preventDefault()

        pathname === "/login" ? (
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then((r) => {
                if(r.ok) {
                    r.json().then((user) => {
                        navigate("/me")
                    })
                } else {
                    r.json().then((err) => setErrors(err.errors))
                }
            })
        ) : (
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData, password_confirmation: formData.password })
            })
            .then((r) => {
                if(r.ok) {
                    r.json().then((user) => {
                        navigate("/me")
                    })
                } else {
                    r.json().then((err) => console.log(err))
                }
            })
        )
    }

    return (
        <Container justify="center">
            <form className="Form" onSubmit={handleAuth}>
                <TextField 
                    label="Username" 
                    margin="normal" 
                    value={formData.username} 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                    error={errors.length !== 0 && errors.filter((err) => err.includes("username")).length !== 0}
                    helperText={errors.filter((err) => err.includes("username"))}
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
                    error={errors.length !== 0 && errors.filter((err) => err.includes("password")).length !== 0}
                    helperText={errors.filter((err) => err.includes("password"))}
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
        </Container>
    )
}
