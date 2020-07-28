import React from "react";
import styled from "styled-components";
import SignUp from "../Auth/SignUp";

export default function Landing() {
    return (
        <LandingWrapper>
            <SignUp />
        </LandingWrapper>
    );
}

const LandingWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
