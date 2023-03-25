import { useState, useEffect } from "react";
import { ImageListItem, ImageListItemBar, Typography, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product, index, grid }) {
    const [image, setImage] = useState("https://dummyimage.com/640x640/ccc/555/&text=image");

    useEffect(() => {
        if(product) {
            if(product.name || product.title) {
                setImage(`https://dummyimage.com/640x640/ccc/555/&text=${product.name || product.title}`)
            }
            if(product.images && product.images.length > 0) {
                setImage(product.images[0].url)
            }
        }
    }, [product])

    return (
        // <ImageListItem 
        //     rows={ grid && index === 0 ? 2 : 1} 
        //     sx={{ 
        //         "&:hover": { ".product-info": { display: "flex" } }
        //     }} 
        //     component={Link} to={product.id ? `/products/${product.id}` : "/"}
        // >
        //     <img 
        //         src={image}
        //         alt={product.name || product.title}
        //         loading="lazy"
        //     />
        //     <ImageListItemBar
        //         className="product-info"
        //         sx={{
        //             background:
        //                 "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
        //                 "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
        //             display: "none"
        //         }}
        //         title={
        //             <Typography sx={{ textTransform: "capitalize"}} noWrap>
        //                 {product.name || product.title}
        //             </Typography>
        //         }
        //         position="top"
        //     />
        // </ImageListItem>
        <CardActionArea 
            key={index}
            sx={{ mb: "14px" }} 
            component={Link} to={product.id ? `/products/${product.id}` : "/"}
        >
            <ImageListItem style={{ marginBottom: 0 }}>
                <img 
                    src={product.name ? image : `https://picsum.photos/${index + 1}00/${index + 2}00`}
                    alt={product.name || product.title}
                    loading="lazy"
                    style={{ height: "380px" }}
                />
                <ImageListItemBar
                    className="product-info"
                    sx={{ alignItems: "center", textAlign: "left", p: 1 }}
                    title={
                        <Typography sx={{ textTransform: "capitalize" }} noWrap>
                            {product.name || product.title}
                        </Typography>
                    }
                    subtitle={`@${product.createdBy ? product.createdBy.name : product.user.username}`}
                    actionIcon={<Typography variant="h6" sx={{ ml: 1 }}>{`$${product.price}`}</Typography>}
                    position="below"
                />
            </ImageListItem>
        </CardActionArea>
    )
}