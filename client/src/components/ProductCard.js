import "../styles/Card.css";
import { Card, CardMedia, CardContent, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({id}) {
    const url = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"

    return (
        <Card className="Card" sx={{ borderRadius: 0 }}>
            <CardActionArea component={Link} to={`/products/${id}`}>
                <CardMedia 
                    component="img"
                    src={url}
                    title="image"
                />
                <CardContent sx={{ height: "90px" }}>
                    <p>Product</p>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}