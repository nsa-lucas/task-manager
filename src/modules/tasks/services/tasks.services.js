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

import { db } from '@/firebase/config.js';

export function getTasks(uid, callback) {
    const tasksRef = collection(db, 'tasks');

    const q = query(
        tasksRef,
        orderBy('created_at', 'desc'),
        where('user_id', '==', uid),
    );

    return onSnapshot(q, (snapshot) => {
        let tasks = [];
        snapshot.forEach((doc) => {
            tasks.push({
                id: doc.id,
                title: doc.data().title,
                status: doc.data().status,
            });
        });

        callback(tasks);
    });
}

export function createTask(uid, title) {
    return addDoc(collection(db, 'tasks'), {
        title: title,
        user_id: uid,
        status: 'Pendente',
        created_at: new Date(),
    });
}

export function updateStatus(id, status) {
    const taskRef = doc(db, 'tasks', id);

    return updateDoc(taskRef, {
        status: status,
    });
}

export function updateTitle(id, title) {
    const taskRef = doc(db, 'tasks', id);

    return updateDoc(taskRef, {
        title: title,
    });
}

export function deleteTasksById(id_list) {
    const batch = writeBatch(db);
    id_list.forEach((id) => {
        const ref = doc(db, 'tasks', id);
        batch.delete(ref);
    });
    return batch.commit();
}
