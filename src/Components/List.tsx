import { ReactNode, useState } from 'react';
import Modal from 'react-modal';
import NewItem from './NewItem';

interface Props {
    lists: IList[],
    // currentList: string,
    currentList: IList|undefined,
    // setCurrentList: (list: string) => void,
    setCurrentList: (list: IList|undefined) => void,
    setView: (view: string) => void,
    createItem: (list: IItem) => void,
    setLists: (listsParam: IList[])=>void,
    previousView: string,
    currentGroup?: IGroup|undefined,
    // This should be put in context/redux
    user: IUser|undefined,
}
const List = (props: Props) => {

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const deleteItem = async (e: React.SyntheticEvent, listId: string, itemId: string|undefined) => {
        e.stopPropagation();
        // console.log("list: ", listId);
        // console.log("item: ", itemId);
        const fetchResult = await fetch("http://localhost:4000/lists/items/delete", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({list: listId, item: itemId})
        });
        const parsedResponse = await fetchResult.json();
        // console.log(parsedResponse);
        const mutatedListState = [...props.lists];
        mutatedListState.forEach(list => {
            if(list._id === listId) {
                list.items = parsedResponse.items.slice();
            }
        });
        props.setLists(mutatedListState);
    }

    const deleteList = async () => {
        const fetchResult = await fetch("http://localhost:4000/lists/delete", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: props.currentList})
        });
        if(fetchResult.status === 200){
            const newLists: IList[] = props.lists.filter(list => list._id !== props.currentList?._id);
            console.log(newLists);
            props.setLists(newLists);
            closeList();
        }
    }

    const closeList = () => {
        props.setCurrentList(undefined);
        props.setView(props.previousView);

    }

    const checkListOwner = (): boolean => {
        if(props.currentList?.owner === props.user?._id) {
            return true
        }
        return false;
    }
    // Can we make this work with the item delete button? How to pass correct parameters? Esp. e?
    const renderDeleteButton = (check: () => boolean, deleteFunction: (e?: React.SyntheticEvent, listId?: string, itemId?: string|undefined) => void): ReactNode|null => {
        if(check()){
            return <button onClick={() => deleteFunction}>Ta bort</button>
        }
        return null;
    }

    // const checkedListOwner = checkListOwner();

    return (
        <section>
            <button onClick={closeList}>Tillbaka</button>
            {/* Change this to currentList! */}
            {props.lists.map(list => {
                if(list._id === props.currentList?._id) {
                    return <h2 key={list._id}>{list.title}</h2>
                }
            })}
            <ul>
                {props.lists.map(list => {
                    if(list._id === props.currentList?._id) {
                        console.log(list._id);
                        
                        return list.items.map(item => {
                            console.log(item);
                            
                            return (
                                <div key={item._id}>
                                    <ul>
                                        <li>{item.name}</li>
                                        <li>{item.desc}</li>
                                        <li>{item.store}</li>
                                        <li>{item.store}</li>
                                    </ul>
                                    {checkListOwner() ? <button onClick={(e) => deleteItem(e, list._id, item._id)}>Ta bort</button> : null}
                                    {/* <button onClick={(e) => deleteItem(e, list._id, item._id)}>Ta bort</button> */}
                                </div>
                            )
                            })
                    }
                })}
            </ul>
            <button onClick={() => setIsOpen(true)}>Lägg till artikel</button>
            {renderDeleteButton(checkListOwner, deleteList)}
            <Modal isOpen={modalIsOpen}>
                <NewItem createItem={props.createItem} setIsOpen={setIsOpen}/>
            </Modal>
        </section>
    );
};

export default List;