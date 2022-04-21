import React, {useState} from 'react';
import Modal from 'react-modal';
import NewList from './NewList';
import Floaties from './Floaties';
import GroupInfo from './GroupInfo';

interface Props {
    lists: IList[]
    setLists: (listsParam: IList[])=>void,
    setView: (view: string) => void,
    setCurrentList: (id: IList|undefined) => void,
    previousView: string,
    currentGroup?: IGroup|undefined,
    setCurrentGroup?: (group: IGroup|undefined) => void,
    heading: string|undefined,
    listView: string,
    user?: IUser,
}
// This is needed for Modal to work correctly
Modal.setAppElement('#root');

const Lists = (props: Props) => {
    const [newListIsOpen, setNewListIsOpen] = useState<boolean>(false);
    const [groupInfoIsOpen, setGroupInfoIsOpen] = useState<boolean>(false);
    
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
    
    // This should be moved to Authorized
    const goBack = () => {
        if(props.currentGroup){
            props.setCurrentGroup!(undefined);
        }
        props.setView(props.previousView);
    }

    const handleMarking = async (e: React.SyntheticEvent, itemId: string|undefined, listId: string, taken: string) => {
        e.stopPropagation();
        const fetchBody = {
            itemId: itemId,
            listId: listId,
            taken: taken ? "" : props.user?._id
        }
            
        const fetchResult = await fetch("http://localhost:4000/lists/items/mark", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchBody)
        })
        if(fetchResult.status === 400) {
            console.log("unauthorized!");
        }
        if(fetchResult.status === 500) {
            console.log("unsynced!");
            alert("Hoppsan! Det verkar som om du och någon annan försökte markera samma artikel! Ladda om sidan och försök igen.");
        }
        if(fetchResult.status === 200) {
            const parsedResponse = await fetchResult.json();
            
            const mutatedListState = [...props.lists];
                mutatedListState.forEach(list => {
                    
                    if(list._id === listId) {
                        list.items = parsedResponse.items.slice();
                    }
                });
                props.setLists(mutatedListState);
        }
    }
    // The functions below render the list item names, a button to mark them as taken and info on who has marked it. 
    // The functions are needed to check who has marked the items and most importantly if the current user is the owner of the list, in which case no info on marking is shown.
    // The first two functions check for mark and list ownership.
    const checkMarker = (markOwner: string) => {
        if(markOwner === props.user?._id) {
            return true;
        }
    }
    const checkOwner = (listOwner: string) => {
        if(listOwner === props.user?._id) {
            return true
        } else {
            console.log("not the owner!");
            
        }
    }
    const renderItemName = (listOwner: string, itemName: string, markOwner: string) => {
        if(checkOwner(listOwner)) return <p>{itemName}</p>
        if(markOwner) return <p className="line-through text-slate-300">{itemName}</p>
        return <p>{itemName}</p>
    }
    const renderMarkerInfo = (listOwner: string, markOwner: string) => {
        if(checkOwner(listOwner)){
            return null;
        }
        if(markOwner){
            return <p>Markerad av {markOwner}</p>
        }
        return null;
    }
    const renderMarkButton = (listOwner: string, markOwner: string, itemId: string|undefined, listId: string) => {
        if(checkOwner(listOwner)) {
            return null
        }
        if(markOwner){
            if(checkMarker(markOwner)) {
                return (
                    <button onClick={(e: React.SyntheticEvent) => handleMarking(e, itemId, listId, markOwner)}>Avmarkera</button>
                )
            }
            return null;
        }
        return <button onClick={(e: React.SyntheticEvent) => handleMarking(e, itemId, listId, markOwner)}>Markera</button>
    }
    
    return (
        <section className='relative mb-24'>
            <div className=' pt-4 pb-8 flex flex-col items-center'>
                <h2 className='text-detail-prim text-center'>{props.heading}</h2>
                {props.currentGroup ? <button className='my-4' onClick={() => setGroupInfoIsOpen(true)}>
                    <img src="/img/button-info.svg" alt="" className="relative"/>
                </button> : null}
                <img src="/img/separator.svg" alt="" className='w-[50px] mx-auto'/>
            </div>
            
            {props.lists.length > 0 ? props.lists?.map(list => {
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
                                        <li 
                                        key={item._id}
                                        id={item._id}
                                        className="flex justify-between">
                                            {renderItemName(list.owner, item.name, item.taken)}
                                            {renderMarkerInfo(list.owner, item.taken)}
                                            {renderMarkButton(list.owner, item.taken, item._id, list._id)}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className='bg-bg-main relative'>
                            <img src="/img/list-crown.svg" alt="" className='relative top-[-3px]'/>
                        </div>
                    </div>
                )
            }) : <div className='mx-auto px-4'>
                    <p className='text-detail-prim text-lg'>Här var det tomt. Klicka på plussknappen i nedre högra hörnet för att skapa en ny lista.</p>
                </div>
            }
            <Floaties goBack={goBack} setIsOpen={setNewListIsOpen}/>
            <Modal isOpen={newListIsOpen} style={{content: {backgroundColor: '#F4F0E1', position: 'fixed', border: '3px solid #DCC67A', top: '200px', bottom: 'unset', margin: 'auto 0'}}}>
                {!props.currentGroup && <NewList setIsOpen={setNewListIsOpen} lists={props.lists} setLists={props.setLists}/>}
                {props.currentGroup && <NewList setIsOpen={setNewListIsOpen} lists={props.lists} setLists={props.setLists} currentGroup={props.currentGroup}/>}
            </Modal>
            <Modal isOpen={groupInfoIsOpen}>
                <GroupInfo currentGroup={props.currentGroup} setIsOpen={setGroupInfoIsOpen}/>
            </Modal>
        </section>
    );
};

export default Lists;
