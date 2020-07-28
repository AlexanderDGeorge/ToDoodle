import React, { useState, useEffect, createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { themes, GlobalStyle } from "./theme";
import { auth } from "./firebase";
import Landing from "./Pages/Landing";
import Router from "./Router";
import { User, InitialUser, fetchUser } from "./User/User";
import { List } from "./List/List";

interface IThemeContext {
    darkMode: boolean;
    setDarkMode: Function;
}

interface IListContext {
    currentList: List | null;
    setCurrentList: Function;
}

export const UserContext = createContext<User>(InitialUser);
export const ListContext = createContext<IListContext | null>(null);
export const ThemeContext = createContext<IThemeContext>({
    darkMode: false,
    setDarkMode: () => {},
});

export default function App() {
    const [currentUser, setCurrentUser] = useState<User>(InitialUser);
    const [darkMode, setDarkMode] = useState(false);
    const [currentList, setCurrentList] = useState<List | null>(null);

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
                        <ListContext.Provider
                            value={{ currentList, setCurrentList }}
                        >
                            <AppDiv>
                                <Router />
                            </AppDiv>
                        </ListContext.Provider>
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
