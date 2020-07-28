import { firestore, fieldValue } from "../firebase";

export interface List {
    id?: string;
    title: string;
    photoURL?: string;
    color: string;
    users: Array<string>;
    toDos?: Array<string>;
}

export const createList = async (list: List) => {
    const listRef = firestore.collection("lists");
    try {
        listRef
            .add({
                ...list,
            })
            .then((newList) => {
                list.users.forEach(async (user) => {
                    const userRef = firestore.collection("users").doc(user);
                    await userRef.update({
                        toDos: fieldValue.arrayUnion(newList.id),
                    });
                });
            });
        console.log("list created.");
    } catch (error) {
        console.error(error.message);
    }
};

export const fetchList = async (listId: string) => {
    const listRef = firestore.collection("lists").doc(listId);
    try {
        const list = await listRef.get();
        console.log("list read done.");
        return { id: listId, ...list.data() };
    } catch (error) {
        console.error(error.message);
    }
};

export const updateList = async (list: List) => {
    const listRef = firestore.collection("lists").doc(list.id);
    try {
        await listRef.update(list);
        console.log("list update done.");
    } catch (error) {
        console.error(error.message);
    }
};

export const deleteList = async (list: List) => {
    if (!list) return;
    const listRef = firestore.collection("lists").doc(list.id);
    try {
        list.users.forEach((user) => {
            const userRef = firestore.collection("users").doc(user);
            userRef.update({
                toDos: fieldValue.arrayRemove(list?.id),
            });
        });
        await listRef.delete();
        console.log("list delete done.");
    } catch (error) {
        console.error(error.message);
    }
};

// export const uploadListPhoto = async (file: any, listId: string) => {
//     return storageRef
//         .child(`listImages/${file}`)
//         .put(file)
//         .then(async (snapshot) => {
//             await snapshot.ref
//                 .getDownloadURL()
//                 .then(async function (downloadURL) {
//                     const listRef = firestore.collection("lists").doc(listId);
//                     listRef.update({
//                         photoURL: downloadURL,
//                     });
//                 });
//         });
// };
