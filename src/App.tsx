import React, { useState, useEffect, createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { themes, GlobalStyle } from "./theme";
import { auth } from "./firebase";
import Landing from "./Pages/Landing";
import Router from "./Router";
import { User, InitialUser, fetchUser } from "./User/User";

interface IThemeContext {
    darkMode: boolean;
    setDarkMode: Function;
}

export const UserContext = createContext<User>(InitialUser);
export const ThemeContext = createContext<IThemeContext>({
    darkMode: false,
    setDarkMode: () => {},
});

export default function App() {
    const [currentUser, setCurrentUser] = useState<User>(InitialUser);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const fetchedUser = await fetchUser(user.uid);
                if (fetchedUser) {
                    console.log(fetchedUser);
                    setCurrentUser(fetchedUser);
                }
            }
        });
    }, []);

    console.log(currentUser);

    if (auth.currentUser) {
        return (
            <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
                <ThemeProvider
                    theme={darkMode ? themes.darkTheme : themes.lightTheme}
                >
                    <GlobalStyle />
                    <UserContext.Provider value={currentUser}>
                        <AppDiv>
                            <Router />
                        </AppDiv>
                    </UserContext.Provider>
                </ThemeProvider>
            </ThemeContext.Provider>
        );
    } else {
        return (
            <AppDiv>
                <Landing />
            </AppDiv>
        );
    }
}

const AppDiv = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.light};
`;
