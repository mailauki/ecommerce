import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory } from "../features/categories/categoriesSlice";
import "../styles/Form.css";
import { TextField, Button, Autocomplete, Chip, Checkbox, List, ListItem, ListItemIcon, ListItemText, ListSubheader, InputAdornment, IconButton, Typography, createFilterOptions, FormControl, OutlinedInput, InputLabel, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const filter = createFilterOptions({
    ignoreCase: true
});

export default function ProductForm() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([]);
    // const [categories, setCategories] = useState(null);
    const [categoryInput, setCategoryInput] = useState("");
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.entities);
    const [open, setOpen] = useState(false);

    function handleOpen(e) { 
        e.preventDefault()
        setOpen(true) 
    }

    function handleClose() { setOpen(false) }

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

        // fetch("/categories")
        // .then((r) => {
        //     if(r.ok) {
        //         r.json().then((data) => setCategories(data))
        //     } else {
        //         r.json().then((data) => console.log(data.error))
        //     }
        // })

        dispatch(fetchCategories())
    }, [dispatch])

    // console.log(categories)

    function handleSubmit() {
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

        setOpen(false)
        console.log(formData, selectedCategories, images)
    }

    if(!categories) return <h1>Loading...</h1>

    return (
        <>
            <form className="Form" onSubmit={handleOpen}>
                <img src={url} alt={formData.name} style={{ height: "300px", objectFit: "contain", display: !url ? "none" : "" }} />

                <TextField 
                    label="Product Name" 
                    margin="normal" 
                    required
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

                {/* <Autocomplete
                    multiple
                    value={selectedCategories}
                    onChange={(event, newValue) => {
                        console.log(newValue)

                        const newCategories = newValue.map((value) => {
                            if(typeof value === 'string') {
                                let newCategory = Object.assign({ name: value.toLowerCase() })
                                console.log({newCategory})

                                // dispatch(addCategory(newCategory))
            
                                // fetch("/categories", {
                                //     method: "POST",
                                //     headers: {
                                //         "Content-Type": "application/json"
                                //     },
                                //     body: JSON.stringify(newCategory)
                                // })
                                // .then((r) => r.json())
                                // .then((data) => {
                                //     dispatch(addCategory(data))
                                //     newCategory = data
                                // })

                                return newCategory
                            } else {
                                return value
                            }
                        })

                        // console.log(newValue.filter((value) => !value.includes(newCategories)))
                        // const newCategories = newThings.filter((value) => {
                        //     const isExisting = categories.some((option) => value.name === option.name)
                        //     if(isExisting) return value
                        //     else dispatch(addCategory(value))
                        // })

                        console.log({newCategories})
                        setSelectedCategories(newCategories)
                    }}
                    id="categories"
                    options={categories}
                    // defaultValue={}
                    getOptionLabel={(option) => {
                        return option.name
                    }}
                    renderOption={(props, option) => <li {...props}>{option.name}</li>}
                    freeSolo
                    filterSelectedOptions
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip label={typeof option === 'string' ? option.toLowerCase() : option.name} {...getTagProps({ index })} />
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
                /> */}
                <Autocomplete
                    multiple
                    id="categories"
                    value={selectedCategories}
                    onChange={(event, newValue) => {
                        // const newCategories = newValue.filter((value) => {
                        //     if(typeof value === 'string') {
                        //         const newCategory = Object.assign({ name: value })
                        //         const findCategory = categories.find((category) => category.name === value)
                        //         const isExisting = selectedCategories.some((category) => category.name === value)
                        //         console.log({isExisting})
                        //         if(findCategory && !isExisting) { 
                        //             return findCategory
                        //         }
                        //         if(!findCategory && !isExisting) return newCategory
                        //     } else {
                        //         return value
                        //     }
                        // })
                        // console.log(event.target.value)
                        // const newCat = newValue.map((value) => typeof value)
                        const selected = newValue.filter((value) => typeof value === 'object')
                        const added = newValue.filter((value) => typeof value === 'string')
                        const newCategories = added.map((value) => {
                            const newCategory = Object.assign({ name: value })
                            const findCategory = categories.find((category) => category.name === value)
                            if(findCategory) return findCategory
                            return newCategory
                        })
                        const filteredCategories = selected.concat(newCategories).filter((value, index, array) => array.indexOf(value) === index)
                        // POST new category if no ID
                        setSelectedCategories(filteredCategories)
                    }}
                    inputValue={categoryInput}
                    onInputChange={(event, newInput) => {
                        setCategoryInput(newInput.toLowerCase())
                    }}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    freeSolo
                    filterSelectedOptions
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip label={typeof option === 'string' ? option : option.name} {...getTagProps({ index })} />
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
                    label="Product Images"
                    margin="normal"
                    value={image}
                    onChange={(event) => {
                        setImage(event.target.value)
                    }}
                    placeholder="Add Images"
                    InputProps={{ 
                        endAdornment: 
                            <InputAdornment position="end">
                                <Tooltip 
                                    title="Add Image" 
                                    followCursor
                                    enterDelay={800} leaveDelay={300}
                                >
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
                                </Tooltip>
                            </InputAdornment> 
                    }}
                />

                <Button variant="contained" type="submit" className="submit">
                    Add Product
                </Button>
            </form>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Ready to Submit?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography color="text.primary" variant="button">Name: </Typography>
                        {formData.name}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="text.primary" variant="button">Description: </Typography>
                        {formData.description === "" ? "No Description" : formData.description}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="text.primary" variant="button">Categories: </Typography>
                        <ul style={{margin: 0}}>{selectedCategories.map((category) => <li>{category.name}</li>)}</ul>
                    </DialogContentText>
                    <DialogContentText>
                        {/* Images: <ul>{images.map((image) => <li>{image.url}</li>)}</ul> */}
                        <Typography color="text.primary" variant="button">Images: </Typography>
                        {images.length === 0 ? "No Images" : images.length}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit} autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}