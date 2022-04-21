import { ReactNode, useState } from 'react';
import Modal from 'react-modal';
import NewItem from './NewItem';
import Floaties from './Floaties';

interface Props {
    lists: IList[],
    currentList: IList|undefined,
    setCurrentList: (list: IList|undefined) => void,
    setView: (view: string) => void,
    createItem: (list: IItem) => void,
    setLists: (listsParam: IList[])=>void,
    previousView: string,
    currentGroup?: IGroup|undefined,
    // This should be put in context/redux
    user: IUser|undefined,
    heading: string|undefined
}
const List = (props: Props) => {

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const deleteItem = async (e: React.SyntheticEvent, listId: string, itemId: string|undefined) => {
        e.stopPropagation();

        const fetchResult = await fetch("http://localhost:4000/lists/items/delete", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({list: listId, item: itemId})
        });
        const parsedResponse = await fetchResult.json();

        const mutatedListState = [...props.lists];
        mutatedListState.forEach(list => {
            if(list._id === listId) {
                list.items = parsedResponse.items.slice();
            }
        });
        props.setLists(mutatedListState);
    }

    const deleteList = async () => {
        if(window.confirm("Vill du radera den här listan? Listans alla artiklar kommer att försvinna och kan ej återskapas.")) {
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
                props.setLists(newLists);
                closeList();
            }
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
            // return <button onClick={() => deleteFunction}>Ta bort</button>
            return (
                <button className="relative w-32 h-9 flex flex-col items-center justify-center border border-detail-sec shadow-button bg-white ml-4 mt-8" onClick={deleteList}>
                    <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
                    Radera lista
                </button>
            )
        }
        return null;
    }


    return (
        <section className='relative'>
            <div className=' pt-4 pb-8'>
                <h2 className='text-detail-prim text-center'>{props.heading}</h2>
                <img src="/img/separator.svg" alt="" className='w-[50px] mx-auto'/>
            </div>
            <div className='relative flex flex-col items-center outline  outline-[2px] outline-detail-sec outline-offset-[-2px] bg-bg-sec w-[360px] mx-auto mb-40'>
                <div className='bg-bg-main relative'>
                    <img src="/img/rectangle-border(3).svg" alt="" className='relative top-[3px]'/>
                </div>
                <div className='py-8'>
                    {/* ul should go */}
                    <ul>
                        {props.lists.map(list => {
                            if(list._id === props.currentList?._id) {
                                console.log(list._id);
                                if(list.items.length > 0) {
                                    return list.items.map(item => {
                                        console.log(item);
                                        
                                        return (
                                            <>
                                                <div key={item._id} className="outline outline-[2.5px] outline-detail-prim outline-offset-[-2.5px] w-[323px] my-4">
                                                    <img src="/img/list-item-crown(2).svg" alt="" className='relative top-[-1px]'/>
                                                    <div className='px-4'>
                                                        <ul>
                                                            <li><span className='underline text-xl'>Titel:</span><br/>{item.name}</li>
                                                            <li><span className='underline text-xl'>Beskrivning:</span><br/>{item.desc}</li>
                                                            <li><span className='underline text-xl'>Affär:</span><br/>{item.store}</li>
                                                            <li><span className='underline text-xl'>Webbsida:</span><br/>{item.url}</li>
                                                        </ul>
                                                        {checkListOwner() ?
                                                        <div className='flex justify-end'>
                                                            <button className="ml-4" onClick={(e) => deleteItem(e, list._id, item._id)}>
                                                                <img src="/img/button-delete.svg" alt="" className="relative"/>
                                                            </button>
                                                        </div>
                                                        : null}
                                                    </div>
                                                    <img src="/img/list-item-crown(2).svg" alt="" className='relative top-[1px] rotate-180'/>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                return (
                                    <div className='mx-auto px-4'>
                                    <p className='text-lg'>Här var det tomt. Använd plussknappen i nedre högra hörnet för att lägga till artiklar till listan.</p>
                                    </div>
                                )
                            }
                        })}
                    </ul>
                {renderDeleteButton(checkListOwner, deleteList)}
                </div>
                <div className='bg-bg-main relative'>
                    <img src="/img/rectangle-border(3).svg" alt="" className='rotate-180 relative top-[-1px] left-[-1px]'/>
                </div>
            </div>
            
            <Modal isOpen={modalIsOpen} style={{content: {backgroundColor: '#F4F0E1', position: 'fixed', border: '3px solid #DCC67A', top: '200px', bottom: 'unset', margin: 'auto 0'}}}>
                <NewItem createItem={props.createItem} setIsOpen={setIsOpen}/>
            </Modal>
            <Floaties goBack={closeList} setIsOpen={setIsOpen}/>
        </section>
    );
};

export default List;