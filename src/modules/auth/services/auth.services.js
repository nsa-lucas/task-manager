import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/firebase/config';

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}
