import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";
import { Label } from "../Components/Form";

export default function PhotoUpload(props: { setPhotoURL: Function }) {
    const [previews, setPreviews] = useState<Array<string>>([]);
    const [active, setActive] = useState<number | null>(null);
    const [image] = useState("");

    function handleChange(e: any) {
        if (e.target.files.length) {
            props.setPhotoURL(e.target.files[0]);
            setPreviews((previews) => [
                ...previews,
                window.URL.createObjectURL(e.target.files[0]),
            ]);
            setActive(previews.length);
        }
    }

    function handlePreviewClick(i: number) {
        props.setPhotoURL(previews[i]);
        setActive(i);
    }

    console.log(active);

    return (
        <PhotoUploadContainer>
            <Label>Upload a Photo</Label>
            <div>
                <FileUploadButton htmlFor="file-upload">
                    <AiOutlineCamera />
                </FileUploadButton>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    value={image}
                    onChange={handleChange}
                    style={{ display: "none" }}
                />
                {previews.map((preview, i) => {
                    console.log(i);
                    console.log(active);
                    return (
                        <PhotoPreview
                            key={i}
                            style={
                                active === i
                                    ? {
                                          backgroundImage: `url(${preview})`,
                                          border: "3px solid #00073bb",
                                      }
                                    : {
                                          backgroundImage: `url(${preview})`,
                                          border: "3px solid #00073bb",
                                      }
                            }
                            onClick={() => handlePreviewClick(i)}
                        />
                    );
                })}
            </div>
        </PhotoUploadContainer>
    );
}

const PhotoUploadContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    > div {
        display: flex;
    }
`;

const FileUploadButton = styled.label`
    > svg {
        height: 40px;
        width: auto;
        margin: 0 10px;
        border: 3px solid ${(props) => props.theme.black};
        cursor: pointer;
    }
`;

const PhotoPreview = styled.div`
    height: 40px;
    width: 40px;
    margin: 0 10px;
    /* border: 3px solid ${(props) => props.theme.black}; */
    border-radius: 50%;
    background-position: 50%;
    background-size: cover;
    cursor: pointer;
`;
