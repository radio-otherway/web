import getFirebase from "../db";
import {
  Auth,
  AuthError,
  AuthProvider,
  CustomParameters,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  UserCredential,
} from "firebase/auth";
import { useCallback, useState } from "react";
export class FirebaseAuth {
  firebaseInstance = getFirebase();

  signInWithGoogle = async () => {};
  signInWithFacebook = async () => {};
  signInWithTwitter = async () => {};
  signIn = async () => {};
}

export default FirebaseAuth;
