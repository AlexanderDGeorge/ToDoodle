import React from "react";
import styled from "styled-components";
import { Label } from "../Components/Form";

interface ListColorPickerProps {
    color: string;
    setColor: Function;
    setPhotoURL: Function;
}

export default function ListColorPicker(props: ListColorPickerProps) {
    function handleColorPick(hex: string) {
        props.setPhotoURL("");
        props.setColor(hex);
    }

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
                    onClick={() => handleColorPick("#c81927")}
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
                    onClick={() => handleColorPick("#1885f2")}
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
                    onClick={() => handleColorPick("#ed8607")}
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
                    onClick={() => handleColorPick("#514ebc")}
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
                    onClick={() => handleColorPick("#00a344")}
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
