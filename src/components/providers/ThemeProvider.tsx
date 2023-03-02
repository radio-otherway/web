import Loading from "@/app/loading";
import { defaults } from "@/lib/constants";
import React, { useEffect } from "react";

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = React.useState("");
  useEffect(() => {
    setTheme(localStorage.getItem("theme") || defaults.defaultTheme);
  }, [theme]);
  return theme ? <>{children}</> : <Loading />;
};

ThemeProvider.displayName = "ThemeProvider";
export default ThemeProvider;
