import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

import serviceAccount from './admin-service-account.json';

console.log('Initializing firebase-admin');

let app: admin.app.App;
try {
    app = admin.app('admin-app');
} catch(ex) {
    console.log('Firebase admin app does not exists, Creating...');
    app =  admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    }, 'admin-app');
}

export const firebaseAuth = getAuth(app);
