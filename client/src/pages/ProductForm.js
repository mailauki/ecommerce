import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory } from "../features/categories/categoriesSlice";
import { addProduct } from "../features/products/productsSlice";
import { fetchProductById } from "../features/products/productSlice";
import "../styles/Form.css";
import SubmitDialog from "../components/SubmitDialog";
import Container from "../components/Container";
import { handleProductSubmit } from "../utils/handleProductSubmit";
import { TextField, Button, Autocomplete, Chip, Checkbox, List, ListItem, ListItemIcon, ListItemText, ListSubheader, InputAdornment, IconButton, Typography, Tooltip, useFormControl } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ProductForm() {
    const { pathname } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useSelector((state) => state.product.entities);
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

    function handleOpen(e) {
        e.preventDefault()

        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

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
            setSelectedCategories(product.categories)
        }
    }, [product, id])

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

    if (!categories) {
        return (
            <Container>
                <Typography variant="h4">Loading...</Typography>
            </Container>
        )
    }

    return (
        <>
            <Container>
                <form className="Form" onSubmit={handleOpen}>
                    <img 
                        src={url} alt={name} 
                        style={{ 
                            height: "300px", 
                            objectFit: "contain", 
                            display: !url ? "none" : "" 
                        }} 
                    />

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

                    <Button 
                        variant="contained" 
                        type="submit" 
                        size="large" 
                        sx={{ mt: 2, p: 2 }}
                    >
                        {pathname === "/products/add" ? "Add Product" : "Update Product" }
                    </Button>
                </form>
            </Container>

            <SubmitDialog 
                open={open} 
                handleClose={handleClose}
                handleSubmit={() => handleProductSubmit({ id, name, price, description, categories, selectedCategories, images, product, setOpen, navigate })}
                name={name}
                price={price}
                description={description}
                selectedCategories={selectedCategories}
                images={images}
            />
        </>
    )
}