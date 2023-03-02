import firebase, { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtk_Ym-AZroXsHvQVcdHXYyc_TvgycAWw",
  authDomain: "radio-otherway.firebaseapp.com",
  projectId: "radio-otherway",
  storageBucket: "radio-otherway.appspot.com",
  messagingSenderId: "47147490249",
  appId: "1:47147490249:web:a84515b3ce1c481826e618",
  measurementId: "G-12YB78EZM4",
};

// export default admin.firestore();
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
