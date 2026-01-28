import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '../../services/firebase';
import HeaderAdmin from '../../components/HeaderAdmin/Index';

export default function Admin() {
    return (
        <div>
            <HeaderAdmin />
            <h1>Minhas tarefas</h1>
        </div>
    );
}
