import React from "react";
import styled from "styled-components";

const FormErrorWrapper = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    color: #cc0000;
    display: flex;
    align-items: center;
`;

export default function FormError(props: { error: string }) {
    const { error } = props;

    return <FormErrorWrapper>{error}</FormErrorWrapper>;
}
