import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogIn, Eye, EyeClosed, CircleChevronLeft } from 'lucide-react';

import { signIn } from '@modules/auth/services/auth.services';

import PrimaryButton from '@shared/components/PrimaryButton';

import hero from '@/assets/hero.svg';
import logo from '@/assets/logo-hero.svg';
import { Container, Content, Hero, Form } from '../../styles/style.js';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();

    async function handleLogin() {
        if (!error && email.length != 0 && password.length > 6) {
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
        } else {
            setError('Preencha corretamente os campos.');
        }
    }

    function verifyEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setError('Formato de email inválido');
        } else {
            setError('');
        }
    }

    return (
        <Container>
            <Hero>
                <div className="hero">
                    <img className="bg-hero" src={hero} alt="hero" />
                </div>
            </Hero>
            <Content>
                <Link className="return-home" to="/">
                    <CircleChevronLeft />
                </Link>
                <Form>
                    <div className="h-form">
                        <h1>Entrar</h1>

                        <img src={logo} alt="TasKlife" />
                    </div>
                    <div className="input-group">
                        <label>Email: </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                verifyEmail();
                            }}
                            placeholder="Digite seu email..."
                        />
                    </div>
                    <div className="input-group">
                        <label>Senha: </label>
                        <div className="password-group">
                            <input
                                type={!passwordVisible ? 'password' : 'text'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                placeholder="Digite sua senha..."
                            />
                            <button
                                className="btn-visible"
                                onClick={() => {
                                    setPasswordVisible(!passwordVisible);
                                }}
                            >
                                {passwordVisible ? (
                                    <Eye size={22} />
                                ) : (
                                    <EyeClosed size={22} />
                                )}
                            </button>
                        </div>
                        <a href="#">Esqueci minha senha</a>
                    </div>
                    {error && <span className="error-msg">{error}</span>}

                    <PrimaryButton
                        text="entrar"
                        onClick={handleLogin}
                        icon={<LogIn size={28} strokeWidth={2} />}
                    />
                    <span className="toRegister">
                        Ainda não possui cadastro ?{' '}
                        <Link to="/register">Registrar-se</Link>
                    </span>
                </Form>
            </Content>
        </Container>
    );
}
