import { Profile } from "@/models";
import {
  createUserWithEmailAndPassword,
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
  UserCredential
} from "firebase/auth";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logger from "@/lib/util/logging";
import { Users } from "@/lib/db/collections";

const useFirebaseAuth = () => {
  const router = useRouter();
  const auth = getAuth();
  const [errorCredential, setErrorCredential] =
    useState<OAuthCredential | null>();

  const [loading, setLoading] = useState(true);
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
  const checkUserOnboarding = async (profile: Profile): Promise<boolean> => {
    if (profile && !profile.isOnboarded) {
      router.push("/profile?page=1&onboarding=1");
      return false;
    }
    return true;
  };
  const clear = () => {
    setLoading(true);
  };
  const getUserProfile = useCallback(async () => {
    if (auth.currentUser !== null) {
      // The user object has basic properties such as display name, email, etc.
      // Going forward we may look this up from the user table in firestore
      const savedProfile = await Users.get(auth.currentUser.uid);
      const profile: Profile = new Profile(
        auth.currentUser.uid,
        (savedProfile?.email || auth.currentUser.email) as string,
        (savedProfile?.displayName || auth.currentUser.displayName) as string,
        (savedProfile?.photoURL || auth.currentUser.photoURL) as string,
        savedProfile?.about as string,
        savedProfile?.mobileNumber as string,
        new Date(),
        savedProfile?.notificationsBrowser || false,
        savedProfile?.notificationsMobile || false,
        savedProfile?.notificationsWhatsapp || false,
        savedProfile?.notificationsEmail || false,
        savedProfile?.isOnboarded || false,
        savedProfile?.deviceRegistrations
      );
      await Users.set(auth.currentUser.uid, Object.assign({}, profile));
      return profile;
    }
  }, [auth.currentUser]);
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
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    const result = await _processSignIn(provider);
    if (result) {
      const profile = await getUserProfile();
      if (profile && await checkUserOnboarding(profile)) {
        router.push("/");
      }
    }
  };
  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    const result = await _processSignIn(provider);
    if (result) {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const profile = await getUserProfile();
      router.push("/");
    }
  };
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await _processSignIn(provider);
  };
  return {
    loading,
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
