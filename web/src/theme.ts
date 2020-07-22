import { createContext, useContext } from "react";
import { DefaultTheme } from "styled-components";

const lightTheme: DefaultTheme = {
    dark: "#555555",
    mid: "#aaaaaa",
    accent: "#cccccc",
    light: "#fafafa",
    white: "white",
    black: "black",
    lightmain: "#f57a80",
    main: "#f4676e",
    darkmain: "#f2545c",
    blue: "#0073bb",
};

const darkTheme: DefaultTheme = {
    dark: "#fafafa",
    mid: "#aaaaaa",
    accent: "#999999",
    light: "#555555",
    white: "#333333",
    black: "#fafafa",
    lightmain: "#f2545c",
    main: "#f4676e",
    darkmain: "#f2545c",
    blue: "#0073bb",
};

export const themes = {
    lightTheme,
    darkTheme,
};
