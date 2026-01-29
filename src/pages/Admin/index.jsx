import { useEffect, useState } from 'react';
import {
    addDoc,
    doc,
    onSnapshot,
    collection,
    where,
    orderBy,
    query,
    updateDoc,
    writeBatch,
} from 'firebase/firestore';

import { db } from '../../services/firebase.js';
import useAuth from '../../auth/useAuth.js';

export default function Admin() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    const [taskTitle, setTaskTitle] = useState('');
    const [idUpdateTask, setIdUpdateTask] = useState('');
    const [idDeleteTasks, setIdDeleteTasks] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const tasksRef = collection(db, 'tasks');

            const q = query(
                tasksRef,
                orderBy('created_at', 'desc'),
                where('user_id', '==', user.uid),
            );

            const unsub = onSnapshot(q, (snapshot) => {
                let task_list = [];

                snapshot.forEach((doc) => {
                    task_list.push({
                        id: doc.id,
                        title: doc.data().title,
                        status: doc.data().status,
                    });
                });

                setTasks(task_list);
            });
        }

        loadTasks();
    }, []);

    async function addTask() {
        if (taskTitle.length === 0) {
            console.log('Preencha corretamente');
        } else {
            await addDoc(collection(db, 'tasks'), {
                title: taskTitle,
                user_id: user.uid,
                status: 'Pendente',
                created_at: new Date(),
            })
                .then(() => {
                    console.log('Tarefa registrada');
                    setTaskTitle('');
                })
                .catch((error) => {
                    console.log('Error ao registrar tarefa' + error);
                });
        }
    }

    async function completeTask(id, status) {
        const taskRef = doc(db, 'tasks', id);

        await updateDoc(taskRef, {
            status: status,
        })
            .then(() => {
                console.log('Status alterado.');
            })
            .catch((error) => {
                console.log('Erro ao alterar tarefa' + error);
            });
    }

    async function updateTaskTitle() {
        const taskRef = doc(db, 'tasks', idUpdateTask);

        await updateDoc(taskRef, {
            title: taskTitle,
        })
            .then(() => {
                console.log('Titulo da tarefa alterado.');
                setIdUpdateTask('');
                setTaskTitle('');
            })
            .catch((error) => {
                console.log('Erro ao alterar tarefa' + error);
            });
    }

    async function deleteTasksById() {
        const batch = writeBatch(db);
        idDeleteTasks.forEach((id) => {
            const ref = doc(db, 'tasks', id);
            batch.delete(ref);
        });
        await batch
            .commit()
            .then(() => {
                console.log('Tarefas deletas com sucesso.');
                setIdDeleteTasks([]);

                console.log(idDeleteTasks);

                if (idUpdateTask != '') {
                    setIdUpdateTask('');
                }
                if (taskTitle != '') {
                    setTaskTitle('');
                }
            })
            .catch((error) => {
                console.log('Falha ao deletar' + error);
            });
    }

    function tasksCheckedToDelete(id) {
        setIdDeleteTasks((prev) => {
            if (prev.includes(id)) {
                return prev.filter((taskId) => taskId !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    return (
        <div>
            <h1>Minhas tarefas</h1>
            <div>
                <div>
                    <textarea
                        type="text"
                        value={taskTitle}
                        onChange={(e) => {
                            setTaskTitle(e.target.value);
                        }}
                        placeholder="Digite o nome da tarefa..."
                    />
                    <button
                        onClick={() => {
                            idUpdateTask != ''
                                ? updateTaskTitle(idUpdateTask)
                                : addTask();
                        }}
                    >
                        Salvar
                    </button>
                    {idUpdateTask != '' && (
                        <button
                            onClick={() => {
                                setTaskTitle('');
                                setIdUpdateTask('');
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
                {tasks.length === 0 ? (
                    <h4>Nenhuma tarefa adicionada.</h4>
                ) : (
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
                                {tasks.map((t) => {
                                    return (
                                        <tr key={t.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => {
                                                        tasksCheckedToDelete(
                                                            t.id,
                                                        );
                                                    }}
                                                />
                                            </td>
                                            <td
                                                className="taskTitle"
                                                type="text"
                                                onDoubleClick={() => {
                                                    setTaskTitle(t.title);
                                                    setIdUpdateTask(t.id);
                                                }}
                                            >
                                                {t.title}
                                            </td>
                                            <td
                                                onDoubleClick={() => {
                                                    t.status === 'Pendente'
                                                        ? completeTask(
                                                              t.id,
                                                              'Concluída',
                                                          )
                                                        : completeTask(
                                                              t.id,
                                                              'Pendente',
                                                          );
                                                }}
                                            >
                                                {t.status}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <button onClick={deleteTasksById}>
                            Deletar seleções
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
