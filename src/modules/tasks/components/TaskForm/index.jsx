import { useEffect, useState } from 'react';

export default function TaskForm({ editingTask, onSubmit }) {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
        }
    }, [editingTask]);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(title);
        setTitle('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o nome da tarefa..."
            />
            <button type="submit">Salvar</button>
        </form>
    );
}
