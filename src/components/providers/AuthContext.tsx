import React, { useEffect, useMemo } from "react";
import { createContext, useState, useCallback } from "react";
import { Profile } from "@/models";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useFirebaseAuth from "@/lib/auth/firebase";

interface IAuthContext {
  profile?: Profile | null;
  isLoggedIn: boolean;
  status: "loading" | "loaded" | "error";
}

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loaded"
  );
  const { getUserProfile, checkUserOnboarding } = useFirebaseAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(
        "AuthContextProvider",
        "onAuthStateChanged",
        user?.displayName
      );
      if (user?.uid) {
        const profile = await getUserProfile();
        if (profile) {
          setProfile(profile);
          setIsLoggedIn(profile !== null);
          if (profile) {
            await checkUserOnboarding(profile);
          }
        }
      } else {
        setIsLoggedIn(false);
        setProfile(null);
        setStatus("loaded");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const value = {
    profile,
    isLoggedIn,
    status,
  };
  useEffect(() => {}, []);
  return <>{children}</>;
};
const useAuthContext = () =>
  createContext<IAuthContext>({
    profile: null,
    isLoggedIn: false,
    status: "loaded",
  });
export { useAuthContext };
export default AuthContextProvider;
