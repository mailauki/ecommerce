import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory } from "../features/categories/categoriesSlice";
import { addProduct, editProduct } from "../features/products/productsSlice";
import "../styles/Form.css";
import { TextField, Button, Autocomplete, Chip, Checkbox, List, ListItem, ListItemIcon, ListItemText, ListSubheader, InputAdornment, IconButton, Typography, Dialog, DialogTitle, DialogActions, DialogContent, Tooltip, Stack, DialogContentText, useFormControl } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchProductById } from "../features/products/productSlice";

export default function ProductForm() {
    const { pathname } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useSelector((state) => state.product.entities);
    // const [formData, setFormData] = useState({ name: product.name || "", price: product.price || "", description: product.description || "" });
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState("");
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.entities);
    const [open, setOpen] = useState(false);
    const [priceFocus, setPriceFocus] = useState("endAdornment");

    // console.log(id)
    // console.log(product)

    function handleOpen(e) {
        e.preventDefault()
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    // 705 T-Shirt --- 705 Plain Short Sleeve and Long Sleeve T-Shirt
    // 1 https://images.unsplash.com/photo-1618354691438-25bc04584c23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80
    // 2 https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80
    // 3 https://images.unsplash.com/photo-1618354691229-88d47f285158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80
    // 4 https://images.unsplash.com/photo-1618354691321-e851c56960d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80
    // 5 https://images.unsplash.com/photo-1618354691714-7d92150909db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    useEffect(() => {
        if(id) {
            dispatch(fetchProductById(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if(product && id) {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setImages(product.images)
        }
    }, [product, id])

    function handleSubmit() {
        const formData = {name: name, price: parseFloat(price), description: description}

        const doubleCheckCategories = selectedCategories.map((selected) => {
            const findCategory = categories.find((category) => category.name === selected.name)
            if (findCategory) return findCategory
            else return selected
        }).filter((value, index, array) => array.indexOf(value) === index)

        // console.log(parseFloat(formData.price))

        // console.log({ formData }, { selectedCategories }, { doubleCheckCategories }, { images })

        if(id) {
            fetch(`/products/${id}"`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then((r) => {
                if(r.ok) {
                    r.json().then((data) => {
                        console.log(data)
                        // dispatch(editProduct(data))

                        if(images.length > 0) {
                            // adds to db if in form and not in db
                            const newImages = images.filter((image) => {
                                const match = product.images.find((product_image) => product_image.url === image.url)
                                return (
                                    match ? null : image
                                )
                            }).flat()

                            newImages.map((image) => {
                                return (
                                    fetch("/images", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({url: image.url, product_id: data.id})
                                    })
                                    .then((r) => r.json())
                                    .then((data) => console.log(data))
                                )
                            })

                            // removes from db if in db and not in form
                            const removeImages = product.images.filter((image) => {
                                const match = images.find((product_image) => product_image.url === image.url)
                                return (
                                    match ? null : image
                                )
                            }).flat()

                            removeImages.map((image) => {
                                return (
                                    fetch(`/images/${image.id}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    })
                                )
                            })
                        }
                    })
                } else {
                    r.json().then((data) => console.log(data.error))
                }
            })
        } else {
            fetch("/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then((r) => {
                if(r.ok) {
                    r.json().then((data) => {
                        console.log(data)
                        dispatch(addProduct(data))
                        // dispatch add to user product total
                    })
                } else {
                    r.json().then((data) => console.log(data.error))
                }
            })
        }

        setOpen(false)

        navigate("/me")
    }

    function PriceAdornment() {
        const { focused } = useFormControl() || {}
        
        const adornment = useMemo(() => {
            if (focused) {
                setPriceFocus("startAdornment")
                return <InputAdornment position="start">$</InputAdornment>
            } else {
                setPriceFocus("endAdornment")
            }
        }, [focused])

        return adornment
    }

    if (!categories) return <h1>Loading...</h1>

    return (
        <>
            <form className="Form" onSubmit={handleOpen}>
                <img src={url} alt={name} style={{ height: "300px", objectFit: "contain", display: !url ? "none" : "" }} />

                <TextField
                    label="Product Name"
                    margin="normal"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField 
                    label="Product Price"
                    margin="normal"
                    required
                    InputProps={{
                        [priceFocus]: <PriceAdornment />
                    }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    label="Product Description"
                    margin="normal"
                    multiline
                    minRows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Autocomplete
                    multiple
                    id="categories"
                    value={selectedCategories}
                    onChange={(event, newValue) => {
                        const filterCategory = newValue.map((value) => {
                            const isExisting = categories.some((option) => value === option.name)
                            const newCategory = Object.assign({ name: value })
                            const findCategory = categories.find((category) => category.name === value)

                            if (!isExisting && typeof value === 'string') {
                                fetch("/categories", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(newCategory)
                                })
                                    .then((r) => r.json())
                                    .then((data) => {
                                        dispatch(addCategory(data))
                                    })

                                return newCategory
                            } else if (isExisting && typeof value === 'string') {
                                return findCategory
                            } else {
                                return value
                            }
                        })

                        const uniqueCategory = filterCategory.filter((value, index, array) => array.indexOf(value) === index)

                        // const doubleCheckCategories = uniqueCategory.map((selected) => {
                        //     const findCategory = categories.find((category) => category.name === selected.name)
                        //     if (findCategory) return findCategory
                        //     else return selected
                        // })

                        // if(selectedCategories.length !== 0 && doubleCheckCategories !== uniqueCategory) {
                        //     console.log("not matching", {selectedCategories}, {doubleCheckCategories}, {uniqueCategory})
                        //     setSelectedCategories(doubleCheckCategories)
                        // } else setSelectedCategories(uniqueCategory)

                        setSelectedCategories(uniqueCategory)
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
                            <Chip label={option.name} {...getTagProps({ index })} />
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
                    {pathname === "/products/add" ? "Add Product" : "Update Product" }
                </Button>
            </form>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ready to Submit?</DialogTitle>

                <DialogContent>
                    <DialogContentText 
                        sx={{ "span": { color: "text.primary", textTransform: "uppercase" }}}
                    >
                        <span>Name: </span>
                        {name}
                    </DialogContentText>

                    <DialogContentText 
                        sx={{ "span": { color: "text.primary", textTransform: "uppercase" }}}
                    >
                        <span>Price: </span>
                        ${price}
                    </DialogContentText>

                    <DialogContentText 
                        sx={{ "span": { color: "text.primary", textTransform: "uppercase" }}}
                    >
                        <span>Description: </span>
                        {description === "" ? "No Description" : description}
                    </DialogContentText>

                    <DialogContentText 
                        sx={{ "span": { color: "text.primary", textTransform: "uppercase" }}}
                    >
                        <span>Categories: </span>
                    </DialogContentText>
                    {selectedCategories.length === 0 ? (
                        <ul style={{ margin: 0, listStyle: "none" }}>
                            <li>
                                <DialogContentText>No Categories</DialogContentText>
                            </li>
                        </ul>
                    ) : (
                        <ul style={{ margin: 0, listStyle: "none" }}>
                            {selectedCategories.map((category) => (
                                <li key={category.id || category.name}>
                                    <DialogContentText>{category.name}</DialogContentText>
                                </li>
                            ))}
                        </ul>
                    )}

                    <DialogContentText 
                        sx={{ "span": { color: "text.primary", textTransform: "uppercase" }}}
                    >
                        <span>Images: </span>
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