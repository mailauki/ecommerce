import "../styles/Card.css";
import { Card, CardMedia, CardContent, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product, index }) {
    return (
        <Card className={`Card ${index === 0 ? "first" : ""}`} sx={{ borderRadius: 0 }}>
            <CardActionArea component={Link} to={`/products/${product.id || product._id}`}>
                <CardMedia 
                    component="img"
                    src={product.images ? product.images[0].url : `https://dummyimage.com/640x640/ccc/555/&text=${product.name || product.title}`}
                    title="image"
                />
                <CardContent sx={{ height: "90px" }}>
                    <p>{product.name || product.title}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}