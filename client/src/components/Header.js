import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import CartButton from './CartButton';

export default function Header() {
    return (
        <div className="Header">
            <div>
                <Link to="/">
                    <h3>Header</h3>
                </Link>
            </div>
            {false ? (
                <CartButton />
            ) : (
                <Button component={Link} to="/login">Login</Button>
            )}
        </div>
    )
}
