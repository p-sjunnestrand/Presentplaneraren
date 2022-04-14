import React, {useState} from 'react';
import Modal from 'react-modal';
import NewList from './NewList';
import Floaties from './Floaties';


interface Props {
    lists: IList[]
    setLists: (listsParam: IList[])=>void,
    setView: (view: string) => void,
    // setCurrentList: (id: string) => void,
    setCurrentList: (id: IList|undefined) => void,
    previousView: string,
    currentGroup?: IGroup|undefined,
    setCurrentGroup?: (group: IGroup|undefined) => void,
    heading: string|undefined,
    listView: string,
}

Modal.setAppElement('#root');

const Lists = (props: Props) => {
    const [newListIsOpen, setNewListIsOpen] = useState<boolean>(false);
    
    const handleClick = (e: React.SyntheticEvent) => {
        const targetId: string = e.currentTarget.id;
        const getTargetList = (id: string): IList|undefined => {
            for(let i: number = 0; i < props.lists.length; i++) {
                if(props.lists[i]._id === id){
                    return props.lists[i];
                }
            }
        };
        props.setCurrentList(getTargetList(targetId));
        props.setView(props.listView)
    }
    // This function should be called inside the list component 
    // const deleteList = async (e: React.SyntheticEvent, id: string) => {
    //     e.stopPropagation();
    //     const fetchResult = await fetch("http://localhost:4000/lists/delete", {
    //         method: "POST",
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({id: id})
    //     });
    //     if(fetchResult.status === 200){
    //         const newLists: IList[] = props.lists.filter(list => list._id !== id);
    //         console.log(newLists);
    //         props.setLists(newLists);
            
    //     }
    // }

    // const deleteItem = async (e: React.SyntheticEvent, listId: string, itemId: string|undefined) => {
    //     e.stopPropagation();
    //     // console.log("list: ", listId);
    //     // console.log("item: ", itemId);
    //     const fetchResult = await fetch("http://localhost:4000/lists/items/delete", {
    //         method: "POST",
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({list: listId, item: itemId})
    //     });
    //     const parsedResponse = await fetchResult.json();
    //     // console.log(parsedResponse);
    //     const mutatedListState = [...props.lists];
    //     mutatedListState.forEach(list => {
    //         if(list._id === listId) {
    //             list.items = parsedResponse.items.slice();
    //         }
    //     });
    //     props.setLists(mutatedListState);
    // } 
    // This should be moved to Authorized
    const goBack = () => {
        if(props.currentGroup){
            props.setCurrentGroup!(undefined);
        }
        props.setView(props.previousView);
    }
    
    return (
        <section className='relative mb-24'>
            <div className=' pt-4 pb-8'>
                <h2 className='text-detail-prim text-center'>{props.heading}</h2>
                <img src="/img/separator.svg" alt="" className='w-[50px] mx-auto'/>
            </div>
                {props.lists?.map(list => {
                    return (
                        <div key={list._id} id={list._id} className="w-[325px] outline-[3px] outline outline-detail-prim outline-offset-[-3px] bg-bg-sec mx-auto mb-4" onClick={handleClick}>
                            <div className='bg-bg-main relative'>
                                <img src="/img/list-crown.svg" alt="" className='rotate-180 relative top-[3px]'/>
                            </div>
                            <div className='relative mt-[-1px] min-h-[200px] px-4'>
                                <h3 className='text-center'>{list.title}</h3>
                                <ul>
                                    {list.items.map(item => {
                                        return (
                                            <li key={item._id} id={item._id} className="flex justify-between">{item.name}</li>
                                        )
                                    })}
                                    {/* <li id={list._id} onClick={handleClick} className="flex justify-between">{list.items}<button onClick={(e) => deleteList(e, list._id)}>Ta bort</button></li> */}
                                </ul>
                            </div>
                            <div className='bg-bg-main relative'>
                                <img src="/img/list-crown.svg" alt="" className='relative top-[-3px]'/>
                            </div>
                        </div>
                    )
                })}
                <Floaties goBack={goBack} setIsOpen={setNewListIsOpen}/>
            {/* <div className='fixed flex justify-between w-full bottom-28'>
                <button className="ml-4" onClick={goBack}>
                    <img src="/img/button-back.svg" alt="" className="relative"/>
                </button>
                <button className="mr-4" onClick={() => setNewListIsOpen(true)}>
                    <img src="/img/button-add.svg" alt="" className="relative"/>
                </button>
            </div> */}
            <Modal isOpen={newListIsOpen} style={{content: {backgroundColor: 'aliceblue', position: 'fixed', border: '3px solid #DCC67A'}}}>
                {!props.currentGroup && <NewList setIsOpen={setNewListIsOpen} lists={props.lists} setLists={props.setLists}/>}
                {props.currentGroup && <NewList setIsOpen={setNewListIsOpen} lists={props.lists} setLists={props.setLists} currentGroup={props.currentGroup}/>}
            </Modal>
        </section>
    );
};

export default Lists;