import React, { useState, useEffect, createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { themes, GlobalStyle } from "./theme";
import { auth, firestore } from "./firebase";
import Landing from "./Pages/Landing";
import Router from "./Router";
import { User, initialUser } from "./User/User";
import { List, initialList } from "./List/List";

interface IThemeContext {
    darkMode: boolean;
    setDarkMode: Function;
}

interface IListContext {
    currentList: List;
    setCurrentList: Function;
}

export const UserContext = createContext<User>(initialUser);
export const ListContext = createContext<IListContext>({
    currentList: initialList,
    setCurrentList: () => {},
});
export const ThemeContext = createContext<IThemeContext>({
    darkMode: false,
    setDarkMode: () => {},
});

export default function App() {
    const [currentUser, setCurrentUser] = useState<User>(initialUser);
    const [currentList, setCurrentList] = useState<List>(initialList);
    const [darkMode, setDarkMode] = useState(false);

    console.log(currentList);
    useEffect(() => {
        let unsubscribe: Function;
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                unsubscribe = firestore
                    .collection("users")
                    .doc(user.uid)
                    .onSnapshot((snapshot) => {
                        if (snapshot.exists) {
                            const data = snapshot.data();
                            if (data) {
                                setCurrentUser({
                                    id: snapshot.id,
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    email: data.email,
                                    photoURL: data.photoURL,
                                    lists: data.lists,
                                });
                            }
                        }
                    });
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

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
