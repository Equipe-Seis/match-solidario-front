import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; //Integração com Authentication - podemos remover se fizermos algo direto no server side

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Ensure correct Storage bucket on web/Android (APK) builds
// Expected format: <project-id>.appspot.com
const rawBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined;
let normalizedBucket = rawBucket;
if (rawBucket && rawBucket.endsWith('.firebasestorage.app')) {
  normalizedBucket = rawBucket.replace('.firebasestorage.app', '.appspot.com');
}
export const storage = normalizedBucket
  ? getStorage(app, `gs://${normalizedBucket}`)
  : getStorage(app);