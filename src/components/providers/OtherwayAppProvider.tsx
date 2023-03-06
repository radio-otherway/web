import React, { useEffect } from "react";
import { AuthProvider, FirestoreProvider, StorageProvider, useFirebaseApp } from "reactfire";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import LogRocket from "logrocket";
import packageJson from "../../../package.json";
import { getStorage } from "@firebase/storage";

const OtherwayAppProvider = ({ children }: React.PropsWithChildren) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  useEffect(() => {
    if (process.env.LOGROCKET_ID && window !== undefined) {
      LogRocket.init(process.env.LOGROCKET_ID, {
        release: packageJson.version,
        rootHostname: "radio-otherway.fergl.ie",
        console: {
          shouldAggregateConsoleErrors: true
        },
        network: {
          requestSanitizer: (request: any) => {
            // if the url contains token 'ignore' it
            if (request.url.toLowerCase().indexOf("token") !== -1) {
              // ignore the request response pair
              return null;
            }
            // remove Authorization header from logrocket
            request.headers.Authorization = undefined;
            // otherwise log the request normally
            return request;
          }
        }
      });
    }
  }, []);
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>
          {children}
        </StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

export default OtherwayAppProvider;
