import React, { createContext, useEffect, useReducer, useState } from "react";
import { defaults } from "@/lib/constants";
import Loading from "@/app/loading";

const initialState = {
  theme: defaults.defaultDarkTheme,
  setTheme: (theme: string) => {
  }
};
export const ThemeContext = createContext(initialState);

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setThemeInternal] = useState(defaults.defaultDarkTheme);
  const [displayBody, setDisplayBody] = useState(false);
  const setTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    document?.querySelector("html")?.setAttribute("data-theme", theme);
    setThemeInternal(theme);
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme") || defaults.defaultDarkTheme;
    setTheme(theme);
    setDisplayBody(true);
  }, []);
  return <ThemeContext.Provider value={{ theme, setTheme }}>
    {displayBody ? children : <Loading />}
  </ThemeContext.Provider>;
};
;

export default ThemeProvider;
