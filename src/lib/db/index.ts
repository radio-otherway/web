import { initializeApp } from "firebase/app";
import {
  DocumentData,
  collection,
  CollectionReference,
  getFirestore, initializeFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};
const firebaseApp = initializeApp(firebaseConfig);
const firestore = initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};
export default firebaseApp;
export { firestore, createCollection, firebaseConfig };
