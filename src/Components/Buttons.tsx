import React, { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
    children: ReactNode;
    onClick: Function;
    disabled?: boolean;
}

export function LargeButton(props: ButtonProps) {
    return (
        <LargeButtonContainer
            disabled={props?.disabled}
            onClick={() => props.onClick()}
            style={props?.disabled ? { backgroundColor: "gray" } : {}}
        >
            {props.children}
        </LargeButtonContainer>
    );
}

const LargeButtonContainer = styled.button`
    height: 60px;
    width: 230px;
    border: 3px solid ${(props) => props.theme.black};
    font-size: 20px;
    background-color: ${(props) => props.theme.blue};
    color: white;
    cursor: pointer;
`;

export function SmallButton(props: ButtonProps) {
    return <SmallButtonContainer>{props.children}</SmallButtonContainer>;
}

const SmallButtonContainer = styled.button`
    height: 60px;
    width: 60px;
    border: 3px solid ${(props) => props.theme.black};
    cursor: pointer;
`;
