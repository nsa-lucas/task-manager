import { X } from 'lucide-react';

import './style.css';

export default function CancelButton({ onCancel }) {
    return (
        <button onClick={onCancel} className="btn-cancel">
            <X />
        </button>
    );
}
