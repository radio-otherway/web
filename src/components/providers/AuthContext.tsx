import { onAuthStateHasChanged } from "@/lib/auth/firebase";
import * as React from "react";

import { createContext, useContext, useEffect, useState } from "react";

interface IAuthState {
  status: "loading" | "authenticated" | "anonymous";
  profile: Profile;
}

const initialState: Pick<IAuthState, "status" | "profile"> = {
  profile: undefined,
  status: "loading",
};

export const AuthContext = createContext({} as IAuthState);
export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [session, setSession] = useState(initialState);
  useEffect(() => {
    onAuthStateHasChanged(setSession);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
