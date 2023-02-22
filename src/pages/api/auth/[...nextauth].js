import GoogleProvider from "next-auth/providers/google";
// import {FirebaseAdapter} from "@next-auth/firebase-adapter"
import {FirestoreAdapter} from "@next-auth/firebase-adapter";
import {initializeApp, getApp, getApps} from "firebase/app";
import {
  getFirestore
} from "firebase/firestore";
import * as firestoreFunctions from 'firebase/firestore'
import NextAuth from "next-auth";


const firebaseConfig = {
  apiKey: "AIzaSyDtQVcCocVj-baMyBNxhV3Fbi7YXeyTXXE",
  authDomain: "radio-otherway.firebaseapp.com",
  projectId: "radio-otherway",
  storageBucket: "radio-otherway.appspot.com",
  messagingSenderId: "47147490249",
  appId: "1:47147490249:web:a84515b3ce1c481826e618",
  measurementId: "G-12YB78EZM4"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  // adapter: FirebaseAdapter({db, ...firestoreFunctions}),
  adapter: FirestoreAdapter(firebaseConfig),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
