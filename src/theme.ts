import { DefaultTheme, createGlobalStyle } from "styled-components";

const lightTheme: DefaultTheme = {
    dark: "#555555",
    mid: "#aaaaaa",
    accent: "#cccccc",
    light: "#fafafa",
    white: "white",
    black: "black",
    blue: "#0073bb",
    lightgreen: "#69ce5f",
    green: "#4cb944",
    cred: "#C81927",
    cblue: "#1885F2",
    corange: "#ED8607",
    cpurple: "#514EBC",
    cgreen: "#00A344",
};

const darkTheme: DefaultTheme = {
    dark: "#fafafa",
    mid: "#aaaaaa",
    accent: "#999999",
    light: "#555555",
    white: "#333333",
    black: "#fafafa",
    blue: "#0073bb",
    lightgreen: "#69ce5f",
    green: "#4cb944",
    cred: "#C81927",
    cblue: "#1885F2",
    corange: "#ED8607",
    cpurple: "#514EBC",
    cgreen: "#00A344",
};

export const themes = {
    lightTheme,
    darkTheme,
};

export const GlobalStyle = createGlobalStyle`
    * {
        color: ${(props) => props.theme.black};
        box-sizing: border-box;
    }
`;
