import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { LogIn, LogOut, ListChecks, UserPlus } from 'lucide-react';

import useAuth from '@modules/auth/hooks/useAuth.js';
import { auth } from '@/firebase/config.js';

import logoImg from '../../../assets/logo.svg';
import { Container, Content } from './style';

export default function Header() {
    const { user } = useAuth();

    return (
        <Container>
            <Content>
                {user ? (
                    <>
                        <Link to="/">
                            <img src={logoImg} alt="TasKlife" />
                        </Link>

                        <nav>
                            <Link to="/dashboard">
                                <ListChecks size={28} strokeWidth={2} />
                                minhas tarefas
                            </Link>
                            <Link
                                onClick={() => {
                                    signOut(auth);
                                }}
                            >
                                <LogOut size={28} strokeWidth={2} />
                                sair
                            </Link>
                        </nav>
                    </>
                ) : (
                    <>
                        <Link to="/">
                            <img src={logoImg} alt="TasKlife" />
                        </Link>
                        <nav>
                            <Link to="/login">
                                <LogIn size={28} strokeWidth={2} />
                                entrar
                            </Link>
                            <Link to="/register">
                                <UserPlus size={28} strokeWidth={2} />
                                registrar
                            </Link>
                        </nav>
                    </>
                )}
            </Content>
        </Container>
    );
}
