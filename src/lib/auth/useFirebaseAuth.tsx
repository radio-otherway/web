import { useEffect, useState, useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  EmailAuthCredential,
  EmailAuthProvider,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  linkWithPopup,
  OAuthCredential,
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  UserCredential,
} from "firebase/auth";
import { app } from "./firebase";
import { useRouter } from "next/navigation";
import { Profile } from "@/models";
import { users } from "../db";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { servicesVersion } from "@ts-morph/common/lib/typescript";
import logger from "../util/logging";
import { debug } from "console";
import React from "react";

export default function useFirebaseAuth() {
  const [errorCredential, setErrorCredential] =
    useState<OAuthCredential | null>();
  const [profile, setProfile] = useState<Profile | undefined>();
  const auth = getAuth(app);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const getUserProfile = useCallback(async () => {
    if (auth.currentUser !== null) {
      // The user object has basic properties such as display name, email, etc.
      // Going forward we may look this up from the user table in firestore
      const savedProfileRef = await getDoc(doc(users, auth.currentUser.uid));
      const savedProfile = savedProfileRef.data();
      const profile: Profile = new Profile(
        auth.currentUser.uid,
        (savedProfile?.email || auth.currentUser.email) as string,
        (savedProfile?.displayName || auth.currentUser.email) as string,
        (savedProfile?.photoURL || auth.currentUser.email) as string,
        savedProfile?.about as string,
        savedProfile?.mobileNumber as string,
        new Date(),
        savedProfile?.deviceRegistrations
      );
      setProfile(profile);
      await setDoc(
        doc(users, auth.currentUser.uid),
        Object.assign({}, profile),
        {
          merge: true,
        }
      );
      return profile;
    }
  }, [auth.currentUser]);
  const authStateChanged = useCallback(
    async (user: any) => {
      if (user) {
        setLoading(true);
        const profile = await getUserProfile();
        setProfile(profile);
      }
      setLoading(false);
    },
    [getUserProfile]
  );
  const clear = () => {
    setProfile(undefined);
    setLoading(true);
  };

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const signUp = async (email: string, password: string): Promise<string> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      logger.debug("useFireBaseAuth", "signUp_success", response);
      return "";
    } catch (err: { code: string } | any) {
      const credential = GoogleAuthProvider.credentialFromError(err);
      if (credential) {
        setErrorCredential(credential as OAuthCredential);
      }
      logger.error("useFireBaseAuth", "signUp", err);
      return err.code;
    }
  };

  const logOut = () => signOut(auth).then(clear);

  const _processSignIn = async (
    provider: any
  ): Promise<UserCredential | undefined> => {
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
          linkWithPopup(auth.currentUser, provider)
            .then((result) => {
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              return credential;
            })
            .catch((error) => {
              console.log(
                "useFirebaseAuth",
                "_processSignIn",
                "Failure in _processSignIn",
                err
              );
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
      const profile = await getUserProfile();
      setProfile(profile);
      router.push("/");
    }
  };
  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    const result = await _processSignIn(provider);
    if (result) {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const profile = await getUserProfile();
      setProfile(profile);
      router.push("/");
    }
  };
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await _processSignIn(provider);
  };

  const linkAccounts = async (user: string, password: string) => {
    debugger;
    const credential = EmailAuthProvider.credential(user, password);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    if (!auth.currentUser) {
      return;
    }

    linkWithPopup(auth.currentUser, provider)
      .then((result) => {
        // Accounts successfully linked.
        debugger;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
      })
      .catch((error) => {
        logger.error("useFirebaseAuth", "linkWithPopup", error);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return unsubscribe;
  }, [auth, authStateChanged]);

  return {
    profile,
    loading,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook,
    linkAccounts,
    getUserProfile,
  };
}
