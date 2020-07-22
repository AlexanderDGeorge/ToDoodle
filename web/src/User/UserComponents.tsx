import React, { useContext } from "react";
import { UserContext } from "../App";

export function UserPhoto() {
    const user = useContext(UserContext);

    return (
        <div>
            <img src={user?.photoURL} alt="" />
        </div>
    );
}
