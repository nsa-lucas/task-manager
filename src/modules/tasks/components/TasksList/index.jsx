import { useEffect, useState } from 'react';
import useAuth from '@modules/auth/hooks/useAuth.js';
import { getTasks } from '@modules/tasks/services/tasks.services';
import { deleteTasksById } from '../../services/tasks.services';
import TaskItem from '../TaskItem';

export default function TasksList({ onEdit }) {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const unsub = getTasks(user.uid, setTasks);
            return () => unsub();
        }

        loadTasks();
    }, []);

    async function deleteTasks() {
        await deleteTasksById(selectedIds)
            .then(() => {
                console.log('Tarefas deletas com sucesso.');
                setSelectedIds([]);
            })
            .catch((error) => {
                console.log('Falha ao deletar' + error);
            });
    }

    function toggleTaskSelection(id) {
        setSelectedIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((taskId) => taskId !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Tarefa</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                        return (
                            <TaskItem
                                key={task.id}
                                task={task}
                                checked={selectedIds.includes(task.id)}
                                onToggle={toggleTaskSelection}
                                onEdit={onEdit}
                            />
                        );
                    })}
                </tbody>
            </table>

            {selectedIds != 0 && <button onClick={deleteTasks}>Deletar</button>}
        </>
    );
}
