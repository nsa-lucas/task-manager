import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signIn } from '@modules/auth/services/auth.services';

import './style.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleLogin() {
        await signIn(email, password)
            .then(() => {
                toast.success('Logado com sucesso.', {
                    autoClose: 1500,
                    onClose: () => {
                        navigate('/dashboard', { replace: true });
                    },
                });
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-credential') {
                    setError('Email ou senha incorretos.');
                } else if (error.code === 'auth/invalid-email') {
                    setError('Formato de email inválido.');
                } else {
                    console.log(error);
                }
            });
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <div>
                <label>Email: </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="Digite seu email..."
                />
                <label>Senha: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="Digite sua senha..."
                />
                {error && <span>{error}</span>}
                <button onClick={handleLogin}>login</button>
            </div>
        </div>
    );
}
