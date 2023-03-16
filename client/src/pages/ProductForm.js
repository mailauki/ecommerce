import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../styles/Form.css";
import { TextField, Button, Autocomplete, Chip, Checkbox, List, ListItem, ListItemIcon, ListItemText, ListSubheader, InputAdornment, IconButton, Typography, Box, ImageListItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ProductForm() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState(null);

    // 705 T-shirt --- 705 Plain Short Sleeve and Long Sleeve T-Shirt
    // 1 https://images.unsplash.com/photo-1618354691438-25bc04584c23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80
    // 2 https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80
    // 3 https://images.unsplash.com/photo-1618354691229-88d47f285158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80
    // 4 https://images.unsplash.com/photo-1618354691229-88d47f285158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80
    // 5 https://images.unsplash.com/photo-1618354691321-e851c56960d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80
    // 6 https://images.unsplash.com/photo-1618354691714-7d92150909db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80

    useEffect(() => {
        // fetch('https://api.storerestapi.com/categories/')
        // .then((r) => r.json())
        // .then((data) => setCategories(data.data))

        fetch("/categories")
        .then((r) => {
            if(r.ok) {
                r.json().then((data) => setCategories(data))
            } else {
                r.json().then((data) => console.log(data.error))
            }
        })
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        // fetch("/products", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(formData)
        // })
        // .then((r) => {
        //     if(r.ok) {
        //         r.json().then((data) => console.log(data))
        //     } else {
        //         r.json().then((data) => console.log(data.error))
        //     }
        // })

        console.log(formData, selectedCategories, images)
    }

    if(!categories) return <h1>Loading...</h1>

    return (
        <form className="Form" onSubmit={handleSubmit}>
            <img src={url} alt={formData.name} style={{ height: "300px", objectFit: "contain" }} />

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
                    const newValueLower = newValue.map((value) => value.toLowerCase())
                    const newCategories = newValueLower.filter((value) => !categories.map((cat) => cat.name).includes(value))
                    if(newCategories) {
                        newCategories.map((cat) => {
                            const addCategory = Object.assign({ name: cat })

                            categories.push(addCategory) // dispatch ?

                            fetch("/categories", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(addCategory)
                            })
                        })
                    }
                    setSelectedCategories(categories.filter((cat) => newValueLower.includes(cat.name)))
                }}
                id="categories"
                options={categories}
                // defaultValue={}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue
                    }
                    // Regular option
                    return option.name
                }}
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip label={option.toLowerCase()} {...getTagProps({ index })} />
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

            <List
                subheader={
                    <ListSubheader 
                    component="div" 
                    sx={{ 
                        borderBottomColor: "divider", 
                        borderBottomStyle: "solid", 
                        borderBottomWidth: 1 
                    }}
                    >
                        Added Images
                    </ListSubheader>
                }
            >
                {images.map((image) => (
                    <ListItem key={image.url}>
                        <ListItemIcon>
                            <Checkbox 
                                checked={images.includes(image)}
                                onChange={() => {
                                    setImages(images.filter((img) => img !== image))
                                    setUrl("")
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText 
                            primary={
                                <Link to={image.url} target="_blank">
                                    <Typography color="text.secondary" noWrap>
                                        {image.url}
                                    </Typography>
                                </Link>
                            } 
                        />
                    </ListItem>
                ))}
            </List>
            <TextField 
                label="Images"
                margin="normal"
                value={image}
                onChange={(event) => {
                    setImage(event.target.value)
                }}
                placeholder="Add Images"
                InputProps={{ 
                    endAdornment: 
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                aria-label="toggle password visibility"
                                onClick={() => {
                                    setImages([...images, Object.assign({ url: image })]) 
                                    setUrl(image)
                                    setImage("")
                                }}
                                edge="end"
                            >
                                <AddIcon />
                            </IconButton>
                        </InputAdornment> 
                }}
            />

            <Button variant="contained" type="submit" className="submit">
                Add Product
            </Button>
        </form>
    )
}