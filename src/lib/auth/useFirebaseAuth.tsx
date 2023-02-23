import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup, signInWithRedirect,
  signOut,
  TwitterAuthProvider
} from "firebase/auth";
import { app } from "./firebase";
import { useRouter } from "next/navigation";
import { User } from "@/models";

const formatAuthUser = (user: User) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const auth = getAuth(app);
  const router = useRouter();

  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setUser(formattedUser);
    setLoading(false);

  };

  const clear = () => {
    setUser(undefined);
    setLoading(true);
  };

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logOut = () =>
    signOut(auth).then(clear);
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        // const user = result.user;
      }
      router.push("/");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

    }
  };
  const signInWithTwitter = () => {
    // const provider = new TwitterAuthProvider();
    //
    // return auth.signInWithPopup(auth, provider)
    //   .then((result) => {
    //     const credential = TwitterAuthProvider.credentialFromResult(result);
    //     if (credential) {
    //       const token = credential.accessToken;
    //       const user = result.user;
    //     }
    //     router.push("/");
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     const email = error.email;
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //   });
  };
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          const user = result.user;
        }
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return unsubscribe;
  }, []);

  return {
    user,
    loading,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook
  };
}
