import React from "react";
import SettingsMenu from "../Settings/SettingsMenu";
import ListMenu from "../List/ListMenu";

export default function Nav() {
    return (
        <div>
            <SettingsMenu bottomPosition="20px" />
            <ListMenu bottomPosition="100px" />
        </div>
    );
}
