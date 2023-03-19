import { ImageListItem, ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product, index, grid }) {
    const image = product.images ? product.images[0].url : `https://dummyimage.com/640x640/ccc/555/&text=${product.name || product.title}`

    return (
        <ImageListItem 
            rows={ grid && index === 0 ? 2 : 1} 
            sx={{ 
                "&:hover": { ".product-info": { display: "flex" } }
            }} 
            component={Link} to={`/products/${product.id || product._id}`}
        >
            <img 
                src={image}
                alt={product.name || product.title}
                loading="lazy"
            />
            <ImageListItemBar
                className="product-info"
                sx={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                    display: "none"
                }}
                title={product.name || product.title}
                position="top"
            />
        </ImageListItem>
    )
}