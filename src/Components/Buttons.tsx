import React, { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
    children: ReactNode;
    onClick: Function;
}

export function LargeButton(props: ButtonProps) {
    return (
        <LargeButtonContainer onClick={() => props.onClick()}>
            {props.children}
        </LargeButtonContainer>
    );
}

const LargeButtonContainer = styled.button`
    height: 60px;
    width: 200px;
    border: 3px solid ${(props) => props.theme.black};
    font-size: 20px;
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
`;
