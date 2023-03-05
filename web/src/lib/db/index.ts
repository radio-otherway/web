import { initializeApp } from "firebase/app";
import {
  DocumentData,
  collection,
  CollectionReference,
  initializeFirestore,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtk_Ym-AZroXsHvQVcdHXYyc_TvgycAWw",

  authDomain: "radio-otherway.firebaseapp.com",

  projectId: "radio-otherway",

  storageBucket: "radio-otherway.appspot.com",

  messagingSenderId: "47147490249",

  appId: "1:47147490249:web:6243de17f52ef79126e618",

  measurementId: "G-X3MXP6RMMC",

  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // // messagingSenderId: process.env.STORAGE_BUCKET,
  // appId: process.env.APP_ID,
  // measurementId: process.env.MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

// initializeFirestore(firebaseApp, {}, "radio-otherway");
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};
export default firebaseApp;
export { firestore, createCollection, firebaseConfig };
