import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { User, fetchUser } from "../User/User";
import { UserContext } from "../App";

interface ListUserCardProps {
    userId: string;
    setUsers: Function;
}

export default function ListUserCard(props: ListUserCardProps) {
    const currentUser = useContext(UserContext);
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        (async function getUser() {
            setUser(await fetchUser(props.userId));
        })();
    }, [props]);

    function removeUser() {
        props.setUsers((users: Array<string>) =>
            users.filter((user) => user !== props.userId)
        );
    }

    if (user) {
        return (
            <ListUserCardContainer>
                <span>
                    <img src={user.photoURL} alt="" />
                    <div>
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                    </div>
                </span>
                {currentUser.id === props.userId ? null : (
                    <button onClick={removeUser}>Remove</button>
                )}
            </ListUserCardContainer>
        );
    } else {
        return null;
    }
}

export function AddUserCard() {
    return (
        <ListUserCardContainer>
            <span>
                <AiOutlinePlusSquare
                    style={{ height: "100%", width: "auto" }}
                />
                <div>Add a user</div>
            </span>
        </ListUserCardContainer>
    );
}

const ListUserCardContainer = styled.div`
    height: 60px;
    min-width: 200px;
    width: 100%;
    max-width: 400px;
    margin: 10px 0;
    border: 3px solid ${(props) => props.theme.black};
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span {
        height: 100%;
        width: 100%;
        display: flex;
        > img {
            height: 100%;
            width: auto;
        }
        > div {
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: bold;
            > * {
                margin: 0;
            }
        }
    }
`;
