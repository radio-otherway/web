import React, { createContext, useContext, Context } from "react";
import { Profile } from "@/models";
import useFirebaseAuth from "./useFirebaseAuth";

interface IAuthUserContext {
  loading: boolean;
  profile: Profile | undefined;
  logOut: () => void;
}

const authUserContext = createContext<IAuthUserContext>({
  loading: true,
  profile: undefined,
  logOut: () => {},
});

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const { loading, profile, logOut } = useFirebaseAuth();
  return (
    <authUserContext.Provider value={{ loading, profile, logOut }}>
      {children}
    </authUserContext.Provider>
  );
}

export const useAuthUserContext = () => useContext(authUserContext);
