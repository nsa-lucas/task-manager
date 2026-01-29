import { updateStatus } from '@modules/tasks/services/tasks.services';

export default function TaskItem({ onEdit, task, checked, onToggle }) {
    async function handleStatus(id, status) {
        await updateStatus(id, status)
            .then(() => {
                console.log('Status alterado.');
            })
            .catch((error) => {
                console.log('Erro ao alterar tarefa' + error);
            });
    }

    return (
        <tr key={task.id}>
            <td>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                        onToggle(task.id);
                    }}
                />
            </td>
            <td
                className="taskTitle"
                type="text"
                onDoubleClick={() => onEdit(task)}
            >
                <span>{task.title}</span>
                <button>Alterar</button>
            </td>
            <td
                onDoubleClick={() => {
                    task.status === 'Pendente'
                        ? handleStatus(task.id, 'Concluída')
                        : handleStatus(task.id, 'Pendente');
                }}
            >
                <span>{task.status}</span>
            </td>
        </tr>
    );
}
