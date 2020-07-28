import React from "react";
import styled from "styled-components";

export default function HorDivWithOr() {
    return (
        <OrDivContainer>
            <HorizontalDividerContainer />
            OR
            <HorizontalDividerContainer />
        </OrDivContainer>
    );
}

const OrDivContainer = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HorizontalDividerContainer = styled.div`
    height: 0;
    width: 75%;
    border-top: 3px solid ${(props) => props.theme.black};
`;
