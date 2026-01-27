import { useState } from 'react';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import './style.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function signIn() {
        await signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                console.log(value);
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-credential') {
                    setError('Email ou senha incorretos.');
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
                <button onClick={signIn}>login</button>
            </div>
        </div>
    );
}
