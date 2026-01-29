import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register } from '@modules/auth/services/auth.services';
import './style.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function userRegister() {
        if (!error) {
            await register(email, password)
                .then(() => {
                    console.log('Cadastrado com sucesso');
                    navigate('/dashboard', { replace: true });
                })
                .catch((error) => {
                    if (error.code === 'auth/weak-password') {
                        setError('A senha deve conter 6 ou mais caracteres.');
                    } else if (error.code === 'auth/email-already-in-use') {
                        setError('Email já existe.');
                    } else if (error.code === 'auth/invalid-email') {
                        setError('Formato de email inválido.');
                    } else if (
                        error.code === 'missing-password' ||
                        error.code === 'missing-email'
                    ) {
                        setError('Todos os campos são obrigátórios.');
                    } else {
                        console.log(error);
                    }
                });
        } else {
            setError('Todos os campos são obrigátórios.');
        }
    }

    function verifyPassword() {
        if (password.length < 6) {
            setError('A senha deve conter 6 ou mais caracteres.');
        } else {
            setError('');
        }
    }

    return (
        <div className="register">
            <h1>Registro</h1>
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
                    onBlur={verifyPassword}
                    placeholder="Digite sua senha..."
                />
                <input type="checkbox" />
                {error && <span>{error}</span>}
                <button onClick={userRegister}>Cadastrar</button>
            </div>
        </div>
    );
}
