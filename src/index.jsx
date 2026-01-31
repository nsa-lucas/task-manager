import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import App from '@/app/App.jsx';
import { AuthProvider } from '@modules/auth/context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>,
);
