import React, { createContext, useContext, Context } from "react";
import useFirebaseAuth from "@/lib/auth/useFirebaseAuth";
import { Profile } from "@/models";

interface IAuthUserContext {
  loading: boolean;
  profile: Profile | undefined,
  logOut: () => void
}

const authUserContext = createContext<IAuthUserContext>({
  loading: true,
  profile: undefined,
  logOut: () => {
  }
});

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const { loading, profile, logOut } = useFirebaseAuth();
  return (
    <authUserContext.Provider value={{ loading, profile, logOut }}>{children}</authUserContext.Provider>
  );
}

export const useAuthUserContext = () => useContext(authUserContext);
