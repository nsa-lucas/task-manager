import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import Register from '@modules/auth/pages/Register';
import LoginPage from '@modules/auth/pages/LoginPage';
import Private from '@/app/routes/Private.jsx';
import Dashboard from '@modules/tasks/pages/Dashboard';
import Header from '@shared/components/Header/Index';

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <Private>
                            <Dashboard />
                        </Private>
                    }
                />

                <Route path="*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}
