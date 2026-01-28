import { useEffect, useState } from 'react';
import { auth } from '../../services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import './style.css';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userSession, setUserSession] = useState(false);

    async function signIn() {
        await signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                setUserDetail({
                    uid: value.user.uid,
                    email: value.user.email,
                });
                setUserSession(true);
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-credential') {
                    setError('Email ou senha incorretos.');
                } else {
                    console.log(error.code);
                }
            });
    }

    if (userSession) {
        return <Navigate to="/admin" />;
    } else {
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
}
