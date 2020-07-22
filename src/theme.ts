import { DefaultTheme, createGlobalStyle } from "styled-components";

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
    lightgreen: "#69ce5f",
    green: "#4cb944",
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
    lightgreen: "#69ce5f",
    green: "#4cb944",
};

export const themes = {
    lightTheme,
    darkTheme,
};

export const GlobalStyle = createGlobalStyle`
    * {
        color: ${(props) => props.theme.black}
    }
`;
