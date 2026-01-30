import { ToastContainer } from 'react-toastify';
import RoutesApp from './routes';

export default function App() {
    return (
        <div className="app">
            <ToastContainer autoClose={2500} theme="light" />
            <RoutesApp />;
        </div>
    );
}
