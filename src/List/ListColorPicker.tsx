import React from "react";
import styled from "styled-components";
import { Label } from "../Components/Form";

interface ListColorPickerProps {
    color: string;
    setColor: Function;
}

export default function ListColorPicker(props: ListColorPickerProps) {
    return (
        <div style={{ margin: "20px 0" }}>
            <Label>Pick a Color</Label>
            <ColorsContainer>
                <ColorItem
                    style={
                        props.color === "#c81927"
                            ? {
                                  backgroundColor: "#c81927",
                                  border: "3px solid #0073bb",
                              }
                            : { backgroundColor: "#c81927" }
                    }
                    onClick={() => props.setColor("#c81927")}
                />
                <ColorItem
                    style={
                        props.color === "#1885f2"
                            ? {
                                  backgroundColor: "#1885f2",
                                  border: "3px solid #0073bb",
                              }
                            : { backgroundColor: "#1885f2" }
                    }
                    onClick={() => props.setColor("#1885f2")}
                />
                <ColorItem
                    style={
                        props.color === "#ed8607"
                            ? {
                                  backgroundColor: "#ed8607",
                                  border: "3px solid #0073bb",
                              }
                            : { backgroundColor: "#ed8607" }
                    }
                    onClick={() => props.setColor("#ed8607")}
                />
                <ColorItem
                    style={
                        props.color === "#514ebc"
                            ? {
                                  backgroundColor: "#514ebc",
                                  border: "3px solid #0073bb",
                              }
                            : { backgroundColor: "#514ebc" }
                    }
                    onClick={() => props.setColor("#514ebc")}
                />
                <ColorItem
                    style={
                        props.color === "#00a344"
                            ? {
                                  backgroundColor: "#00a344",
                                  border: "3px solid #0073bb",
                              }
                            : { backgroundColor: "#00a344" }
                    }
                    onClick={() => props.setColor("#00a344")}
                />
            </ColorsContainer>
        </div>
    );
}

const ColorsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const ColorItem = styled.div`
    height: 40px;
    width: 40px;
    margin: 10px;
    border: 3px solid ${(props) => props.theme.black};
    border-radius: 50%;
    cursor: pointer;
`;
