import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Private from './Private';
import Admin from '../pages/Admin';

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        <Private>
                            <Admin />
                        </Private>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
