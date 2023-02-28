"use client";
import React, { useCallback } from "react";
import { themes } from "./themes";
import { useState, useEffect } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BiDownArrow } from "react-icons/bi";
import { defaults } from "@/lib/constants";
import { useTheme } from "react-daisyui";
import { themeChange } from "theme-change";

const ThemeSelector = () => {
    const _switchTheme = useCallback(() => {
      const elem = document.activeElement as HTMLElement;
      elem?.blur();
    }, []);

    return (
      <div title="Change Theme" className="dropdown-end dropdown">
        <div tabIndex={0} className="gap-1 normal-case btn-ghost btn">
          <IoColorPaletteOutline className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6" />

          <span className="hidden md:inline">Theme</span>
          <BiDownArrow className="hidden w-3 h-3 ml-1 fill-current opacity-60 sm:inline-block" />
        </div>
        <div
          className="dropdown-content rounded-t-box rounded-b-box top-px h-[70vh] max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl">
          <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
            {themes.map((theme) => (
              <button
                key={theme.id}
                className="overflow-hidden text-left rounded-lg outline-base-content"
                data-set-theme={theme.id}
                onClick={() => _switchTheme()}
              >
                <div
                  data-theme={theme.id}
                  className="w-full font-sans cursor-pointer bg-base-100 text-base-content"
                >
                  <div className="grid grid-cols-5 grid-rows-3">
                    <div className="flex items-center col-span-5 row-span-3 row-start-1 gap-2 px-4 py-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="invisible w-3 h-3"
                      >
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                      </svg>
                      <div className="flex-grow text-sm font-bold">
                        {theme.id}
                      </div>
                      <div className="flex flex-wrap flex-shrink-0 h-full gap-1">
                        <div className="w-2 rounded bg-primary" />
                        <div className="w-2 rounded bg-secondary" />
                        <div className="w-2 rounded bg-accent" />
                        <div className="w-2 rounded bg-neutral" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
      ;
  }
;

export default ThemeSelector;
