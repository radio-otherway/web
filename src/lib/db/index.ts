import serviceAccount from "serviceAccount.json";
import { initializeApp } from "firebase/app";
import { getFirestore, CollectionReference, collection, DocumentData } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtk_Ym-AZroXsHvQVcdHXYyc_TvgycAWw",
  authDomain: "radio-otherway.firebaseapp.com",
  projectId: "radio-otherway",
  storageBucket: "radio-otherway.appspot.com",
  messagingSenderId: "47147490249",
  appId: "1:47147490249:web:a84515b3ce1c481826e618",
  measurementId: "G-12YB78EZM4"
};
export const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore();
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};


// Import all your model types
import { Show, Reminder } from "@/models";
// export all your collections

export const shows = createCollection<Show>("shows");
export const reminders = createCollection<Reminder>("reminders");

export default firestore;
