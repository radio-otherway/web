import LogRocket from "logrocket";
import * as React from "react";

export const logRocketIdentify = (id: string, options?: any) => {
  console.debug(`log rocket identify ${id}`);
  if (id) {
    LogRocket.identify(id, {
      ...(!!options && options),
    });
  }
};

type LogRocket = {
  LogRocket: any;
  initialized: boolean;
  setEnabled: (enabled: boolean) => void;
};

export const LogRocketContext = React.createContext<LogRocket>({
  LogRocket,
  initialized: false,
  setEnabled: (enabled: boolean) => {},
});

export const LogRocketProvider: React.FunctionComponent = ({
  children,
}: React.PropsWithChildren) => {
  const [initialized, setInitialized] = React.useState(false);
  const [enabled, setEnabled] = React.useState(true);
  if (typeof window !== "undefined") {
    LogRocket.init("qfpqoi/radio-otherway", {
      console: {
        isEnabled: false,
      },
    });
  }

  const identifyViewer = React.useCallback(
    (viewer: Viewer) => {
      if (!viewer) return;

      if (!initialized) {
        initialize();
      }
      if (enabled && initialized) {
        const { contact_id, ...rest } = viewer;
        logRocketIdentify(contact_id, {
          ...rest,
        });
        setIdentified(viewer);
      }
    },
    [enabled, initialized, initialize]
  );

  React.useEffect(() => {
    identifyViewer(viewer);
  }, [identified, initialized, viewer]);

  React.useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  return (
    <LogRocketContext.Provider
      value={{
        LogRocket,
        identified,
        identifyViewer,
        initialized,
        setEnabled,
      }}
    >
      {children}
    </LogRocketContext.Provider>
  );
};

export default function useLogRocket({ viewer }: { viewer: any }) {
  const logRocketContext = React.useContext(LogRocketContext);

  if (viewer) {
    logRocketContext.identifyViewer(viewer);
  }

  return logRocketContext;
}
