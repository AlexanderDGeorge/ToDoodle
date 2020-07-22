import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../App";

export default function ProfileNavItem() {
    const user = useContext(UserContext);

    return (
        <ProfileNavItemContainer>
            <img src={user?.photoURL} alt="" />
            <div>
                <h2>{user?.firstName}</h2>
            </div>
        </ProfileNavItemContainer>
    );
}

const ProfileNavItemContainer = styled.div`
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid white;
    color: white;
    display: flex;
    justify-content: space-between;
    > img {
        height: 90%;
        width: auto;
    }
    > div {
        display: flex;
        flex-direction: column;
        > h2 {
        }
    }
`;
