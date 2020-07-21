import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";
import { auth, fetchUser } from "./firebase";
import SignUp from "./Auth/SignUp";
import Landing from "./Pages/Landing";

const AppDiv = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ddd;
`;

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
                console.log("here");
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
                <Landing />
            </AppDiv>
        );
    } else {
        return (
            <AppDiv>
                <SignUp />
            </AppDiv>
        );
    }
}
