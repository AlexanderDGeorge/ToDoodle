import React from "react";
import styled from "styled-components";

export default function NavItem(props: {
    name: string;
    toggleOpen: Function;
    icon?: JSX.Element;
    path?: string;
}) {
    return (
        <NavItemContainer>
            <p>{props.name}</p>
            {props.icon}
        </NavItemContainer>
    );
}

const NavItemContainer = styled.div`
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid ${(props) => props.theme.black};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
