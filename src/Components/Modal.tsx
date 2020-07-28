import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface ModalProps {
    setOpen: Function;
    children: React.ReactElement;
}

export default function Modal(props: ModalProps) {
    return (
        <ModalContainer>
            <ModalContent setOpen={props.setOpen}>
                {props.children}
            </ModalContent>
        </ModalContainer>
    );
}

function ModalContent(props: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: any) {
            if (!modalRef.current?.contains(e.target)) {
                props.setOpen(false);
            }
        }
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [props]);

    return (
        <ModalContentContainer ref={modalRef}>
            {props.children}
        </ModalContentContainer>
    );
}

const ModalContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContentContainer = styled.div`
    border: 3px solid ${(props) => props.theme.black};
`;
