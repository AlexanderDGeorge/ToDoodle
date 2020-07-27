import React, { useState, useEffect } from "react";
import Menu from "../Nav/Menu";
import { List, deleteList } from "./List";
import ListIcon from "./ListIcon";
import { LargeButton } from "../Components/Buttons";
import { Label } from "../Components/Form";
import { User, fetchUser } from "../User/User";
import ListUserCard, { AddUserCard } from "./ListUserCard";

export default function ListMenu(props: { bottomPostion: string; list: List }) {
    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        (async function fetchListUsers() {
            setUsers([]);
            props.list.users.forEach(async (user) => {
                const importedUser = await fetchUser(user);
                setUsers((users: any) => [...users, importedUser]);
            });
        })();
    }, []);

    async function handleDelete() {
        await deleteList(props.list);
    }

    return (
        <Menu
            bottomPosition={props.bottomPostion}
            icon={<ListIcon list={props.list} />}
        >
            <h1>{props.list.title}</h1>
            <div>
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
            <LargeButton onClick={handleDelete}>Delete List</LargeButton>
        </Menu>
    );
}
