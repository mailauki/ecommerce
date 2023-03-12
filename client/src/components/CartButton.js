import { useState } from 'react';
import { Badge, IconButton } from '@mui/material';
import CartIcon from '@mui/icons-material/LocalMall';

export default function CartButton() {
    let [count, setCount] = useState(0)

    return (
        <IconButton onClick={() => setCount(count+=1)}>
            <Badge badgeContent={count} color="primary">
                <CartIcon />
            </Badge>
        </IconButton>
    )
}
