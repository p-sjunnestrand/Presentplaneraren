import { useEffect, useState } from "react";
import Modal from 'react-modal';
import NewList from './NewList';

interface Props {
    currentGroup: IGroup|undefined,
    setCurrentGroup: (group: IGroup|undefined) => void,
    previousView: string,
    setView: (view: string) => void,
    setCurrentList: (id: string) => void,
    heading: string,
}
// This component is almost identical to the Lists-component. Could we make them one?
const Group = (props: Props) => {
    const [groupLists, setGroupLists] = useState<IList[]>([]);
    const [newListIsOpen, setNewListIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchGroupLists = async () => {
            const currentGroupId = props.currentGroup?._id;
            const fetchResult = await fetch(`http://localhost:4000/lists/${currentGroupId}`, {
                method: "GET",
                credentials: "include"
            });
            const parsedResponse = await fetchResult.json();
            console.log(parsedResponse);
            setGroupLists(parsedResponse);
        }
        fetchGroupLists();
    }, []);

    const handleClick = (e: React.SyntheticEvent) => {
        props.setCurrentList(e.currentTarget.id);
        props.setView("list");
    }
    const closeGroup = () => {
        props.setCurrentGroup(undefined);
        props.setView(props.previousView);
    }
    return (
        <section>
            <section className='relative mb-24'>
            <div className=' pt-4 pb-8'>
                <h2 className='text-detail-prim text-center'>{props.heading}</h2>
                <img src="/img/separator.svg" alt="" className='w-[50px] mx-auto'/>
            </div>
                {groupLists?.map(list => {
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
                                </ul>
                            </div>
                            <div className='bg-bg-main relative'>
                                <img src="/img/list-crown.svg" alt="" className='relative top-[-3px]'/>
                            </div>
                        </div>
                        
                    )
                })}
            <div className='fixed flex justify-between w-full bottom-28'>
                <button className="ml-4" onClick={() => props.setView("groups")}>
                    <img src="/img/button-back.svg" alt="" className="relative"/>
                </button>
                <button className="mr-4" onClick={() => setNewListIsOpen(true)}>
                    <img src="/img/button-add.svg" alt="" className="relative"/>
                </button>
            </div>
            <Modal isOpen={newListIsOpen} style={{content: {backgroundColor: 'aliceblue', position: 'fixed'}}}>
                <NewList setIsOpen={setNewListIsOpen} lists={groupLists} setLists={setGroupLists}/>
            </Modal>
        </section>
        </section>
    );
};

export default Group;