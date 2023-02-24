import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider, linkWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup, signInWithRedirect,
  signOut,
  TwitterAuthProvider
} from "firebase/auth";
import { app } from "./firebase";
import { useRouter } from "next/navigation";
import { Profile } from "@/models";
import { FirebaseAuth } from "@firebase/auth-types";
import firebase from "firebase/app";
import LoginFunctions from "@/lib/auth/loginFunctions";


export default function useFirebaseAuth() {
  const [profile, setProfile] = useState<Profile | undefined>();
  const auth = getAuth(app);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const getUserProfile = (): Profile | undefined => {
    if (auth.currentUser !== null) {
      // The user object has basic properties such as display name, email, etc.
      // Going forward we may look this up from the user table in firestore
      const profile = new Profile(
        auth.currentUser.uid,
        auth.currentUser.email,
        auth.currentUser.displayName,
        auth.currentUser.photoURL,
        auth.currentUser.emailVerified
      );
      setProfile(profile);
      return profile;
    }
  };
  const authStateChanged = async (user: any) => {
    if (user) {
      setLoading(false);
      const profile = getUserProfile();
      setProfile(profile);
      return;
    }
  };

  const clear = () => {
    setProfile(undefined);
    setLoading(true);
  };

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logOut = () =>
    signOut(auth).then(clear);

  const _processSignIn = async (provider: any) => {
    try {
      try {
        const result = await signInWithPopup(auth, provider);
      } catch (error: any) {
        if (error.code === "auth/account-exists-with-different-credential") {
          linkWithPopup(result.currentUser, provider).then((result) => {
            // Accounts successfully linked.
            const credential = GoogleAuthProvider.credentialFromResult(result);
          }).catch((error) => {
            console.log("useFirebaseAuth", "_processSignIn", "Failure in _processSignIn", err);
            // Handle Errors here.
            // ...
          });
        }
      }
      if (result.user) {
        const profile = getUserProfile();
        setProfile(profile);
        router.push("/");
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    const credential = await signInWithPopup(auth, provider);
    return LoginFunctions.signInOrLink(GoogleAuthProvider.PROVIDER_ID, credential, credential.user.email);
    // await _processSignIn(provider);
  };
  const signInWithTwitter = async () => {
    const credential = new TwitterAuthProvider();
    return LoginFunctions.signInOrLink(GoogleAuthProvider.PROVIDER_ID, credential, credential.user.email);
  };
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await _processSignIn(provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return unsubscribe;
  }, []);

  return {
    profile,
    loading,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook,
    getUserProfile
  };
}
