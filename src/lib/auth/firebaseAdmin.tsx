import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);
export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
