import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Profile } from "@/models";
import { useUser } from "reactfire";
import useFirebaseAuth from "@/lib/auth/signin";
import logger from "@/lib/util/logging";

interface IAuthProfileProviderState {
  profile: Profile | undefined;
  setProfile: (profile: Profile | undefined) => void;
}

const initialState: IAuthProfileProviderState = {
  profile: undefined,
  setProfile: (profile) => {},
};
export const AuthProfileContext = createContext(initialState);
const AuthProfileProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { status, data: user } = useUser();
  const { getUserProfile, checkUserOnboarding } = useFirebaseAuth();
  useEffect(() => {
    console.log(
      "AuthProfileProvider",
      "AuthProfileProvider",
      "status: ",
      status,
      "user: ",
      user
    );
    if (status === "success" && user) {
      const profile = getUserProfile()
        .then((profile) => {
          if (profile) {
            setProfile(profile);
            checkUserOnboarding(profile, true);
          }
        })
        .catch((err) => {
          logger.debug("AuthProfileProvider", "Error loading provider", err);
        });
    }
  }, [status, user, getUserProfile, checkUserOnboarding]);

  const [profile, setProfile] = useState<Profile>();

  return (
    <AuthProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </AuthProfileContext.Provider>
  );
};
export default AuthProfileProvider;
