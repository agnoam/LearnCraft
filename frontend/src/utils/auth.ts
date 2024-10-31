import {
    type User,
    GoogleAuthProvider,
    signInWithPopup,
    browserLocalPersistence
} from 'firebase/auth';
import * as AuthLib from 'firebase/auth';

import { firebaseAuth } from '../configs/firebase';

export function onAuthStateChanged(callback: (authUser: User | null) => void): void {
    AuthLib.onAuthStateChanged(
        firebaseAuth, 
        callback, 
        (ex) => console.error('Firebase Auth error:', ex), 
        () => console.log('Firebase auth initialized')
    );
}

export async function signIn(provider: GoogleAuthProvider): Promise<User> {
    if (provider instanceof GoogleAuthProvider) {
        console.log('Adding scopes keep and contacts scopes to google sign in');

        // Adding scope for google keep of the user
        // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        // provider.addScope("https://www.googleapis.com/auth/contacts.other.readonly");
    }


    // Managing the tokens automatically in indexedDB and localStorage
    await firebaseAuth.setPersistence(browserLocalPersistence);
    const result = await signInWithPopup(firebaseAuth, provider);
    if (!result || !result.user) {
        throw new Error('Firebase auth sign in failed');
    }

    return result.user;
}

export async function signOut(): Promise<void> {
    await firebaseAuth.signOut();
}