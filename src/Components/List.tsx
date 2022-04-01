import { useState } from 'react';
import Modal from 'react-modal';
import NewItem from './NewItem';

interface Props {
    lists: IList[],
    currentList: string,
    setView: (view: string) => void,
    createItem: (list: IItem) => void,
}
const List = (props: Props) => {

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    return (
        <section>
            <button onClick={() => props.setView("lists")}>Tillbaka</button>
            <h2>{props.lists.map(list => {
                if(list._id === props.currentList) {
                    return list.title
                }
            })}</h2>
            <ul>
                {props.lists.map(list => {
                    if(list._id === props.currentList) {
                        console.log(list._id);
                        
                        return list.items.map(item => {
                            console.log(item);
                            
                            return (
                                <ul key={item._id}>
                                    <li>{item.name}</li>
                                    <li>{item.desc}</li>
                                    <li>{item.store}</li>
                                    <li>{item.store}</li>
                                </ul>
                            )
                            })
                    }
                })}
            </ul>
            <button onClick={() => setIsOpen(true)}>Lägg till artikel</button>
            <Modal isOpen={modalIsOpen}>
                <NewItem createItem={props.createItem} setIsOpen={setIsOpen}/>
            </Modal>
        </section>
    );
};

export default List;