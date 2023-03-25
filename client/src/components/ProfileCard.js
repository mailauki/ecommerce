import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardActionArea, ImageListItem, ImageListItemBar, Typography } from "@mui/material";

export default function ProfileCard({ product, index }) {
    const [image, setImage] = useState("https://dummyimage.com/640x640/ccc/555/&text=image");

    useEffect(() => {
        if(product) {
            if(product.name) {
                setImage(`https://dummyimage.com/640x640/ccc/555/&text=${product.name}`)
            }

            if(product.images && product.images.length > 0) {
                setImage(product.images[0].url)
            }
        }
    }, [product])

    return (
        <CardActionArea 
            sx={{ 
                "&:hover": { ".product-info": { display: "flex" } }, 
                mb: "8px"
            }} 
            component={Link} to={`/products/${product.id}`}
        >
            <ImageListItem style={{ marginBottom: 0 }}>
                <img 
                    src={image}
                    alt={product.name}
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
                    title={
                        <Typography sx={{ textTransform: "capitalize"}} noWrap>
                            {product.name || product.title}
                        </Typography>
                    }
                    position="top"
                />
            </ImageListItem>
        </CardActionArea>
    )
}