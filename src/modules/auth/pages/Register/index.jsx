import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserPlus, Eye, EyeClosed, CircleChevronLeft } from 'lucide-react';

import { register } from '@modules/auth/services/auth.services';
import hero from '@/assets/hero-2.svg';
import logo from '@/assets/logo-hero.svg';
import PrimaryButton from '@shared/components/PrimaryButton';
import { Container, Content, Hero, Form } from '../../styles/style.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();

    async function userRegister() {
        if (!error && email.length != 0 && password.length > 6) {
            await register(email, password)
                .then(() => {
                    toast.success('Cadastrado com sucesso', {
                        onClose: () => {
                            navigate('/dashboard', { replace: true });
                        },
                    });
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
            setError('Preencha corretamente os campos.');
        }
    }

    function verifyPassword() {
        if (password.length < 6) {
            setError('A senha deve conter 6 ou mais caracteres.');
        } else {
            setError('');
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
                <Form>
                    <div className="icon-home">
                        <Link className="link-home" to="/">
                            <CircleChevronLeft />
                        </Link>
                    </div>
                    <div className="h-form">
                        <h1>Cadastro</h1>

                        <img src={logo} height={'40px'} alt="TasKlife" />
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
                                    verifyPassword();
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
                    </div>
                    {error && <span className="error-msg">{error}</span>}

                    <PrimaryButton
                        text="Cadastrar"
                        onClick={userRegister}
                        icon={<UserPlus size={28} strokeWidth={2} />}
                    />
                    <span className="toRegister">
                        Já possui uma conta ?{' '}
                        <Link to="/login">Faça login</Link>
                    </span>
                </Form>
            </Content>
        </Container>
    );
}
