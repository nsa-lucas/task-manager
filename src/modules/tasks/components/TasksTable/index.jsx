import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Trash2, X } from 'lucide-react';

import useAuth from '@modules/auth/hooks/useAuth.js';
import {
    updateStatus,
    getTasks,
    deleteTasksById,
} from '@modules/tasks/services/tasks.services';

import SecondayButton from '../SecondaryButton';
import { Container } from './styles';

export default function TasksTable({ onEdit }) {
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

    async function handleStatus(id, status) {
        await updateStatus(id, status)
            .then(() => {
                toast.success('Status alterado.');
            })
            .catch((error) => {
                console.log(error);
                toast.warn('Falha ao alterar status.');
            });
    }

    async function deleteTasks() {
        await deleteTasksById(selectedIds)
            .then(() => {
                toast.success('Tarefas deletadas com sucesso.');
                setSelectedIds([]);
            })
            .catch((error) => {
                toast.warn('Falha ao deletar tarefas.');
                console.log(error);
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
        tasks.length != 0 && (
            <Container>
                <table className="task-list">
                    <thead>
                        <tr>
                            <th className="uncheck">
                                {selectedIds.length > 0 && (
                                    <SecondayButton
                                        onClick={() => {
                                            setSelectedIds('');
                                        }}
                                        icon={<X />}
                                    />
                                )}
                            </th>
                            <th>Tarefa</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => {
                            return (
                                <tr key={task.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(
                                                task.id,
                                            )}
                                            onChange={() => {
                                                toggleTaskSelection(task.id);
                                            }}
                                        />
                                    </td>
                                    <td
                                        className="taskTitle"
                                        type="text"
                                        onDoubleClick={() => onEdit(task)}
                                    >
                                        <span>{task.title}</span>
                                    </td>
                                    <td
                                        onDoubleClick={() => {
                                            task.status === 'Pendente'
                                                ? handleStatus(
                                                      task.id,
                                                      'Concluída',
                                                  )
                                                : handleStatus(
                                                      task.id,
                                                      'Pendente',
                                                  );
                                        }}
                                    >
                                        <span>{task.status}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {selectedIds != 0 && (
                    <SecondayButton
                        onClick={deleteTasks}
                        text={'deletar selecionados'}
                        icon={<Trash2 />}
                    />
                )}
            </Container>
        )
    );
}
