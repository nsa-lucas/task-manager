import { Link } from 'react-router-dom';

import './style.css';

export default function Header() {
    return (
        <header>
            <h1>Header</h1>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
            <Link to="/admin">Admin</Link>
        </header>
    );
}
