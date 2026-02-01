import { useState } from 'react';
import { toast } from 'react-toastify';

import useAuth from '@modules/auth/hooks/useAuth.js';
import TasksTable from '@modules/tasks/components/TasksTable';
import TaskForm from '@modules/tasks/components/TaskForm';
import {
    updateTitle,
    createTask,
} from '@modules/tasks/services/tasks.services';

import { Container } from './style.js';

export default function Dashboard() {
    const { user } = useAuth();
    const [editingTask, setEditingTask] = useState(null);

    function handleEditTask(task) {
        setEditingTask(task);
    }

    async function handleSaveTask(title) {
        if (editingTask) {
            await updateTitle(editingTask.id, title)
                .then(() => {
                    toast.success('Titulo da tarefa alterado.');
                    setEditingTask(null);
                })
                .catch((error) => {
                    toast.warn('Erro ao alterar tarefa.');
                    console.log(error);
                });
        } else {
            await createTask(user.uid, title)
                .then(() => {
                    toast.success('Tarefa registrada com sucesso.');
                })
                .catch((error) => {
                    toast.warn('Falha ao registrar tarefa.');
                    console.log(error);
                });
        }
    }

    return (
        <Container>
            <TaskForm
                editingTask={editingTask}
                onSubmit={handleSaveTask}
                onCancel={() => setEditingTask(null)}
            />
            <TasksTable onEdit={handleEditTask} />
        </Container>
    );
}
