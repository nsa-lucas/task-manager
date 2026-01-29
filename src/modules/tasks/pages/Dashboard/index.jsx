import { useState } from 'react';

import useAuth from '@modules/auth/hooks/useAuth.js';
import TasksList from '@modules/tasks/components/TasksList';
import TaskForm from '../../components/TaskForm';
import {
    updateTitle,
    createTask,
} from '@modules/tasks/services/tasks.services';

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
                    console.log('Titulo da tarefa alterado.');
                    setEditingTask(null);
                })
                .catch((error) => {
                    console.log('Erro ao alterar tarefa' + error);
                });
        } else {
            await createTask(user.uid, title)
                .then(() => {
                    console.log('Tarefa registrada');
                })
                .catch((error) => {
                    console.log('Error ao registrar tarefa' + error);
                });
        }
    }

    return (
        <div>
            <h1>Minhas tarefas</h1>
            <div>
                <TaskForm editingTask={editingTask} onSubmit={handleSaveTask} />
                <TasksList onEdit={handleEditTask} />
            </div>
        </div>
    );
}
