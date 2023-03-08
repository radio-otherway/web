import { Profile } from "@/models";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  linkWithPopup,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  UserCredential
} from "firebase/auth";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logger from "@/lib/util/logging";
import { Users } from "@/lib/db/collections";
import { useFirebaseApp } from "reactfire";

const useFirebaseAuth = () => {
  const router = useRouter();
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const [errorCredential, setErrorCredential] = useState();
  const _processSignIn = async (
    provider: any
  ): Promise<UserCredential | null> => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (err: any) {
      console.error("useFirebaseAuth", "_processSignIn", err);
      if (err.code === "auth/account-exists-with-different-credential") {
        const credential = OAuthProvider.credentialFromError(err);
        console.log("useFirebaseAuth", "_processSignIn_duplicateAccount", err);
        if (auth?.currentUser) {
          linkWithPopup(auth.currentUser, provider)
            .then((result) => {
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              return credential;
            })
            .catch((error) => {
              console.error(
                "useFirebaseAuth",
                "_processSignIn",
                "Failure in _processSignIn",
                err
              );
            });
        }
      }
    }
    return null;
  };
  const checkUserOnboarding = async (
    profile: Profile,
    redirectIfNew: boolean = false
  ): Promise<boolean> => {
    if (profile && !profile.isOnboarded && redirectIfNew) {
      router.push("/profile?page=1&onboarding=1");
      return false;
    }
    router.push("/");
    return true;
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result) {
      router.push("/");
      return result;
    }
    return null;
  };

  const signUp = async (email: string, password: string): Promise<string> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      logger.debug("useFireBaseAuth", "signUp_success", response);
      return "";
    } catch (err) {
      logger.error("useFireBaseAuth", "signUp", err);
      return err.code;
    }
  };

  const logOut = () => signOut(auth).then(() => {

  });
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    const result = await _processSignIn(provider);
  };
  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    const result = await _processSignIn(provider);
    if (result) {
      const credential = TwitterAuthProvider.credentialFromResult(result);
    }
  };
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await _processSignIn(provider);
  };
  const getUserProfile = (uid: string) => {

  };
  return {
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook,
    // linkAccounts,
    getUserProfile,
    checkUserOnboarding
  };
};
export default useFirebaseAuth;
