import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

export default function ProfileNavItem() {
    const user = useContext(UserContext);

    return (
        <ProfileNavItemContainer>
            <img src={user?.photoURL} alt="" />
            <div>
                <h2>{user?.firstName}</h2>
                <Link to="/account">Edit Account</Link>
            </div>
        </ProfileNavItemContainer>
    );
}

const ProfileNavItemContainer = styled.div`
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid ${(props) => props.theme.black};
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
            color: ${(props) => props.theme.dark};
        }
    }
`;
