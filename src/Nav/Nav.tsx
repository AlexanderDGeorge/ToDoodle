import React, { useEffect, useState, useContext } from "react";
import SettingsMenu from "../Settings/SettingsMenu";
import NewListMenu from "../List/NewListMenu";
import { UserContext } from "../App";
import { fetchList, List } from "../List/List";
import ListMenu from "../List/ListMenu";

export default function Nav() {
    const [lists, setLists] = useState<Array<List>>([]);
    const currentUser = useContext(UserContext);

    useEffect(() => {
        (function fetchLists() {
            setLists([]);
            currentUser.lists.forEach(async (list) => {
                const importedList = await fetchList(list);
                setLists((lists: any) => [...lists, importedList]);
            });
        })();
    }, [currentUser]);

    return (
        <div>
            <SettingsMenu bottomPosition="20px" />
            <NewListMenu bottomPosition="70px" />
            {lists.map((list, i) => (
                <ListMenu
                    list={list}
                    bottomPosition={`${120 + 50 * i}px`}
                    key={i}
                />
            ))}
        </div>
    );
}
