import React from "react";
import styled from "styled-components";
import { List } from "./List";

export default function ListIcon(props: { list: List }) {
    const listInitial = props.list.title.slice(0, 1).toUpperCase();
    return (
        <ListIconContainer style={{ backgroundColor: props.list.color }}>
            <p style={{ fontWeight: "bold" }}>{listInitial}</p>
        </ListIconContainer>
    );
}

const ListIconContainer = styled.div`
    height: 40px;
    width: 40px;
    border: 3px solid ${(props) => props.theme.black};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
