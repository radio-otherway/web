import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider, linkWithPopup, OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup, signInWithRedirect,
  signOut,
  TwitterAuthProvider, UserCredential
} from "firebase/auth";
import { app } from "./firebase";
import { useRouter } from "next/navigation";
import { Profile } from "@/models";
import { FirebaseAuth } from "@firebase/auth-types";
import firebase from "firebase/app";


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

  const signIn = (email: string, password: string): Promise<> =>
    signInWithEmailAndPassword(auth, email, password);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logOut = () =>
    signOut(auth).then(clear);

  const _processSignIn = async (provider: any): Promise<UserCredential | undefined> => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (err: any) {
      console.log("useFirebaseAuth", "_processSignIn", err);
      if (err.code === "auth/account-exists-with-different-credential") {
        const credential = OAuthProvider.credentialFromError(err);
        console.log("useFirebaseAuth", "_processSignIn_duplicateAccount", err);
        const auth = getAuth();
        if (auth?.currentUser) {
          linkWithPopup(auth.currentUser, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            return credential;
          }).catch((error) => {
            console.log("useFirebaseAuth", "_processSignIn", "Failure in _processSignIn", err);
          });
        }
      }
    }
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    const result = await _processSignIn(provider);
    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const profile = getUserProfile();
      setProfile(profile);
      router.push("/");
    }
  };
  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    const result = await _processSignIn(provider);
    if (result) {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const profile = getUserProfile();
      setProfile(profile);
      router.push("/");
    }
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
