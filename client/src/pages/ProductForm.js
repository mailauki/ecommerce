import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Form.css";
import { TextField, Button, Autocomplete, Chip } from "@mui/material";

export default function ProductForm() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [selectedCategories, setSelectedCategories] = useState([])
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        fetch('https://api.storerestapi.com/categories/')
        .then((r) => r.json())
        .then((data) => setCategories(data.data))
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        // fetch("/products/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(formData)
        // })

        console.log(formData, selectedCategories)
    }

    if(!categories) return <h1>Loading...</h1>

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
                multiline
                minRows={4}
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
            <Autocomplete
                multiple
                onChange={(event, newValue) => {
                    const newCategories = newValue.filter((value) => !categories.map((cat) => cat.name).includes(value))
                    if(newCategories) {
                        newCategories.map((cat) => categories.push(Object.assign({name: cat})))
                        // replace push with POST to db
                    }
                    setSelectedCategories(categories.filter((cat) => newValue.includes(cat.name)))
                }}
                id="categories"
                options={categories.map((option) => option.name)}
                // defaultValue={}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Product Categories"
                        margin="normal" 
                        placeholder="Add Categories"
                    />
                )}
            />

            <Button variant="contained" type="submit" className="submit">
                Add Product
            </Button>
        </form>
    )
}