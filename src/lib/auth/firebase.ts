import firebase, {getApp, getApps, initializeApp} from 'firebase/app';
import 'firebase/auth';
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtQVcCocVj-baMyBNxhV3Fbi7YXeyTXXE",
  authDomain: "radio-otherway.firebaseapp.com",
  projectId: "radio-otherway",
  storageBucket: "radio-otherway.appspot.com",
  messagingSenderId: "47147490249",
  appId: "1:47147490249:web:a84515b3ce1c481826e618",
  measurementId: "G-12YB78EZM4"
};

export const app = initializeApp(firebaseConfig);