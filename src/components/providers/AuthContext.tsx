import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { Profile } from "@/models";
import { onAuthStateChanged } from "firebase/auth";
import { Users } from "@/lib/db/collections";
import { auth } from "@/lib/firebase";

interface IAuthContext {
  profile?: Profile | null,
  isLoggedIn: boolean,
  status: "loading" | "loaded" | "error"
}

const AuthContext = createContext<IAuthContext>({
  profile: null,
  isLoggedIn: false,
  status: "loaded"
});
const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loaded");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("AuthContextProvider", "onAuthStateChanged", user?.displayName);
      if (user?.uid) {
        const profile = await Users.get(user?.uid);
        setProfile(profile);
        setIsLoggedIn(profile !== null);
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
    status
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuthContext = () => useContext(AuthContext);
export default AuthContextProvider;
