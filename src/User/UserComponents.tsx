import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { User, fetchUser } from "./User";

interface UserCardProps {
    user: User;
    children?: React.ReactNode;
}

export function UserCardFromId(props: { userId: string }) {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        (async function getUser() {
            setUser(await fetchUser(props.userId));
        })();
    }, [props]);

    if (user) {
        return <UserCard user={user}></UserCard>;
    } else {
        return null;
    }
}

export function UserCard(props: UserCardProps) {
    return (
        <UserCardContainer>
            <img src={props.user.photoURL} alt="" />
            <div>
                <p>{props.user.firstName}</p>
                <p>{props.user.lastName}</p>
            </div>
        </UserCardContainer>
    );
}

export const UserCardContainer = styled.div`
    height: 100px;
    min-width: 200px;
    width: 100%;
    max-width: 400px;
    border: 3px solid ${(props) => props.theme.black};
    display: flex;
    > img {
        height: 100%;
        width: auto;
    }
    > div {
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-weight: bold;
        > * {
            margin: 0;
        }
    }
`;
