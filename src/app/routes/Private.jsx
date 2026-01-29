import { Navigate } from 'react-router-dom';

import useAuth from '@modules/auth/hooks/useAuth';

export default function Private({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Carregando</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}
