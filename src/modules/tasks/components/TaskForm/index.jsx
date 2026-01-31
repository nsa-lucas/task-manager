import { useEffect, useState } from 'react';
import { Save, X } from 'lucide-react';

import PrimaryButton from '@/shared/components/PrimaryButton';
import { toast } from 'react-toastify';
import SecondaryButton from '../SecondaryButton';

export default function TaskForm({ editingTask, onSubmit, onCancel }) {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
        } else {
            setTitle('');
        }
    }, [editingTask]);

    function handleSubmit(e) {
        e.preventDefault();
        if (title != '') {
            onSubmit(title);
            setTitle('');
        } else {
            toast.warn('Preencha o campo com o nome da tarefa.');
        }
    }

    return (
        <form className="taskForm" onSubmit={handleSubmit}>
            <label>Nova tarefa:</label>
            <div className="input">
                {editingTask && (
                    <SecondaryButton onCancel={onCancel} icon={<X />} />
                )}
                <textarea
                    className="input-task"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite o nome da tarefa..."
                />
            </div>

            <PrimaryButton type="submit" text={'salvar'} icon={<Save />} />
        </form>
    );
}
