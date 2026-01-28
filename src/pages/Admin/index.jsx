import { useEffect, useState } from 'react';

import { auth } from '../../services/firebase';
import useAuth from '../../auth/useAuth.js';
import HeaderAdmin from '../../components/HeaderAdmin/Index';

export default function Admin() {
    const { user, loading } = useAuth();
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([
        {
            name: 'tarefa 1',
            status: 'pendente',
        },
        {
            name: 'tarefa 1',
            status: 'pendente',
        },
        {
            name: 'tarefa 1',
            status: 'pendente',
        },
        {
            name: 'tarefa 1',
            status: 'pendente',
        },
        {
            name: 'tarefa 1',
            status: 'pendente',
        },
    ]);

    useEffect(() => {
        console.log(user);
        console.log(loading);
    });

    return (
        <div>
            <h1>Minhas tarefas</h1>
            <div>
                <div>
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => {
                            setTask(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            const newTask = {
                                name: task,
                                status: 'pendente',
                            };

                            setTasks([...tasks, newTask]);
                            setTask('');
                        }}
                    >
                        Adicionar
                    </button>
                </div>
                {tasks.length === 0 ? (
                    <h4>Nenhuma tarefa adicionada.</h4>
                ) : (
                    tasks.map((task, index) => {
                        return (
                            <li key={index}>
                                <span>{task.name}</span>

                                <span>{task.status}</span>

                                <button>Alterar</button>
                            </li>
                        );
                    })
                )}
            </div>
        </div>
    );
}
