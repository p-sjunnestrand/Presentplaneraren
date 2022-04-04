import {useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import NewList from './NewList';


interface Props {
    lists: IList[]
    setLists: (listsParam: IList[])=>void,
    setView: (view: string) => void,
    setCurrentList: (id: string) => void,
}

Modal.setAppElement('#root');

const Lists = (props: Props) => {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    
    const handleClick = (e: React.SyntheticEvent) => {
        props.setCurrentList(e.currentTarget.id);
        props.setView("list")
    }
    const deleteList = async (e: React.SyntheticEvent, id: string) => {
        e.stopPropagation();
        const fetchResult = await fetch("http://localhost:4000/lists/delete", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id})
        });
        if(fetchResult.status === 200){
            const newLists: IList[] = props.lists.filter(list => list._id !== id);
            console.log(newLists);
            props.setLists(newLists);
            
        }
        // const parsedResult = await fetchResult.json();
        
    }
    return (
        <section>
            <button onClick={() => props.setView("dashboard")}>Tillbaka</button>
            <h2>Listor</h2>
            <ul>
                {props.lists?.map(list => {
                    return (
                        <li key={list._id} id={list._id} onClick={handleClick}>{list.title}<button onClick={(e) => deleteList(e, list._id)}>Ta bort</button></li>
                        
                    )
                })}
            </ul>
            <button onClick={() => setIsOpen(true)}>Ny lista</button>
            <Modal isOpen={modalIsOpen} >
                <NewList setIsOpen={setIsOpen} lists={props.lists} setLists={props.setLists}/>
            </Modal>
        </section>
    );
};

export default Lists;