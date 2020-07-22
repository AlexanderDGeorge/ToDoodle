import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";
import { auth, fetchUser } from "./firebase";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photoURL: string;
    toDos: Array<String>;
}

export const UserContext = createContext<User | null>(null);

export default function App() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const fetchedUser = await fetchUser(user.uid);
                setCurrentUser(fetchedUser ? fetchedUser : null);
            } else {
                setCurrentUser(null);
            }
        });
    }, []);

    console.log(currentUser);

    if (currentUser) {
        return (
            <AppDiv>
                <Home />
            </AppDiv>
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
    background-color: #ddd;
`;
