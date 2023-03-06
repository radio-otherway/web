/*
This component will handle the theme (dark/light). You are able to change the selected theme line 9.
DaisyUI have more than 10 themes availables https://daisyui.com/docs/default-themes
*/
import React from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useEffect, useState } from "react";
import { defaults } from "@/lib/constants";

const theme = {
  primary: defaults.defaultTheme,
  secondary: defaults.defaultDarkTheme,
};

const ThemeToggle = (): React.ReactNode => {
  const [activeTheme, setActiveTheme] = useState(
    document.body.dataset.theme || ""
  );
  const inactiveTheme =
    activeTheme === defaults.defaultTheme
      ? defaults.defaultDarkTheme
      : defaults.defaultTheme;

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
  }, [activeTheme]);

  return (
    <button className="ml-3 flex" onClick={() => setActiveTheme(inactiveTheme)}>
      {activeTheme === theme.secondary ? (
        <HiOutlineSun className="m-auto text-xl hover:text-accent" />
      ) : (
        <HiOutlineMoon className="m-auto text-xl hover:text-accent" />
      )}
    </button>
  );
};

export default ThemeToggle;
