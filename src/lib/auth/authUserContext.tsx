import React, {createContext, useContext, Context} from 'react'
import useFirebaseAuth from "@/lib/auth/useFirebaseAuth";
import {User} from "@/models";

interface IAuthUserContext {
  authUser: User | undefined;
  loading: boolean;
  signIn: (email: string, password: string) => {},
  signUp: (email: string, password: string) => {},
  logOut: () => {},
  signInWithGoogle: () => {},
  signInWithTwitter: () => {},
  signInWithFacebook: () => {}
}

const authUserContext
  = createContext<IAuthUserContext>({
  authUser: undefined,
  loading: true,
  signIn: async (email: string, password: string) => {
  },
  signUp: async (email: string, password: string) => {
  },
  logOut: async () => {
  },
  signInWithGoogle: async () => {
  },
  signInWithTwitter: async () => {
  },
  signInWithFacebook: async () => {
  },
});

export function AuthUserProvider({children}: { children: React.ReactNode }) {
  const auth
    = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuthUserContext = () => useContext(authUserContext);
