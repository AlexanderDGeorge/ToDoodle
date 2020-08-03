import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Menu from "../Nav/Menu";
import { List, deleteList, initialList } from "./List";
import ListIcon from "./ListIcon";
import { LargeButton } from "../Components/Buttons";
import { Label } from "../Components/Form";
import { User, fetchUser } from "../User/User";
import ListUserCard, { AddUserCard } from "./ListUserCard";
import { ListContext } from "../App";

interface ListMenuProps {
    list: List;
    bottomPosition: string;
}

export default function ListMenu(props: ListMenuProps) {
    return (
        <Menu
            bottomPosition={props.bottomPosition}
            icon={<ListIcon list={props.list} />}
        >
            <ListForm {...props} />
        </Menu>
    );
}

function ListForm(props: { toggleOpen?: Function; list: List }) {
    const { setCurrentList } = useContext(ListContext);
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
        if (props.toggleOpen) props.toggleOpen();
        setCurrentList(props.list);
    }

    function handleDelete() {
        if (props.toggleOpen) props.toggleOpen();
        deleteList(props.list);
        setCurrentList(initialList);
    }

    return (
        <ListMenuContainer>
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
        </ListMenuContainer>
    );
}

const ListMenuContainer = styled.div``;
