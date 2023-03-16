import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../styles/Form.css";
import { TextField, Button, Autocomplete, Chip, Checkbox, List, ListItem, ListItemIcon, ListItemText, ListSubheader, InputAdornment, IconButton, Typography } from "@mui/material";
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
    // https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350
    // https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1280px-Frog_on_palm_frond.jpg
    // https://st2.depositphotos.com/1423335/5533/i/450/depositphotos_55336153-stock-photo-australian-green-tree-frog.jpg

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
            <img src={url} alt={formData.name} />
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
                // options={categories.map((option) => option.name)}
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
            {/* <Autocomplete
                multiple
                onChange={(event, newValue) => {
                    console.log(newValue)
                    setImages(newValue.map((option) => Object.assign({ url: option })))
                }}
                inputValue={imageInputValue}
                onInputChange={(event, newInputValue) => {
                    setImageInputValue(newInputValue)
                }}
                filterSelectedOptions
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={images || []}
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
                    return option.url
                }}
                renderOption={(props, option) => <li {...props}>{option.url}</li>}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Product Images"
                        margin="normal" 
                    />
                )}
            /> */}
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
                    <ListItem>
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