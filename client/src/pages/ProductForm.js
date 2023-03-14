import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Form.css";
import { TextField, Button } from "@mui/material";

export default function ProductForm() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", description: "" });

    function handleSubmit(e) {
        e.preventDefault()

        console.log(formData)
    }

    return (
        <form className="Form" onSubmit={handleSubmit}>
            <TextField 
                label="Product Name" 
                margin="normal" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
            <TextField 
                label="Product Description" 
                margin="normal" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />

            <Button variant="contained" type="submit" className="submit">
                Add Product
            </Button>
        </form>
    )
}