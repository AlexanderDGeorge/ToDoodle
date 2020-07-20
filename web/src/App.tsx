import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";
import { auth, fetchUser } from "./firebase";
import SignUp from "./Auth/SignUp";

const AppDiv = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ddd;
`;

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    photoURL: string;
}

const UserContext = createContext(null);

export default function App() {
    const [currentUser, setCurrentUser] = useState<User | any>(null);

    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(await fetchUser(user.uid));
            } else {
                setCurrentUser(null);
            }
        });
    }, []);

    return (
        <AppDiv>
            <SignUp />
        </AppDiv>
    );
}
