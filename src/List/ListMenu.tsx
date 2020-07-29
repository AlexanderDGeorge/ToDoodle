import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Menu, { MenuContext } from "../Nav/Menu";
import { List, deleteList } from "./List";
import ListIcon from "./ListIcon";
import { LargeButton } from "../Components/Buttons";
import { Label } from "../Components/Form";
import { User, fetchUser } from "../User/User";
import ListUserCard, { AddUserCard } from "./ListUserCard";
import { ListContext } from "../App";

export default function ListMenu(props: { bottomPostion: string; list: List }) {
    const listContext = useContext(ListContext);
    const toggleOpen = useContext(MenuContext);
    const [users, setUsers] = useState<Array<User>>([]);
    const history = useHistory();

    useEffect(() => {
        (async function fetchListUsers() {
            setUsers([]);
            props.list.users.forEach(async (user) => {
                const importedUser = await fetchUser(user);
                setUsers((users: any) => [...users, importedUser]);
            });
        })();
    }, [props.list.users]);

    function handleView() {
        history.replace("/list");
        listContext?.setCurrentList(props.list);
        // [TODO] close menu
    }

    async function handleDelete() {
        if (toggleOpen) toggleOpen();
        await deleteList(props.list);
    }

    return (
        <Menu
            bottomPosition={props.bottomPostion}
            icon={<ListIcon list={props.list} />}
        >
            <h1>{props.list.title}</h1>
            <LargeButton onClick={handleView}>View List</LargeButton>
            <div style={{ marginTop: 10 }}>
                <Label>Users</Label>
                {users.map((user, i) => (
                    <ListUserCard
                        userId={user.id}
                        setUsers={setUsers}
                        key={i}
                    />
                ))}
                <AddUserCard />
            </div>
            <LargeButton onClick={handleDelete} color={"#C81927"}>
                Delete List
            </LargeButton>
        </Menu>
    );
}
