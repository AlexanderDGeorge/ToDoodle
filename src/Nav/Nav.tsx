import React from "react";
import SettingsMenu from "./SettingsMenu";
import ToDoMenu from "../ToDo/ToDoMenu";

export default function Nav() {
    return (
        <div>
            <SettingsMenu bottomPosition="20px" />
            <ToDoMenu bottomPosition="100px" />
        </div>
    );
}
