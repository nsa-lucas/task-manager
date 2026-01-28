import { Link } from 'react-router-dom';
import useAuth from '../../auth/useAuth';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

import './style.css';

export default function Header() {
    const { user } = useAuth();

    return (
        <header>
            {user ? (
                <>
                    <h1>Admin</h1>
                    <Link to="/">Inicio</Link>
                    <Link to="/admin">Admin</Link>
                    <button
                        onClick={async () => {
                            await signOut(auth);
                        }}
                    >
                        logout
                    </button>
                </>
            ) : (
                <>
                    <h1>Task Manager</h1>
                    <Link to="/">Inicio</Link>
                    <Link to="/login">Entrar</Link>
                    <Link to="/register">Registrar</Link>
                </>
            )}
        </header>
    );
}
