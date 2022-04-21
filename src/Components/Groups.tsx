import Modal from 'react-modal';
import { useState } from 'react';
import NewGroup from './NewGroup';
import Invite from './Invite';
import Floaties from './Floaties';

interface Props {
    groups: IGroup[],
    setGroups: (groupsParam: IGroup[])=>void,
    setView: (view: string) => void,
    invites: IInvite[],
    changeInvites: (id: string, resp: boolean) => void,
    setCurrentGroup: (group: IGroup|undefined) => void,
    previousView: string,
}

const Groups = (props: Props) => {

    const [newGroupIsOpen, setNewGroupIsOpen] = useState<boolean>(false);
    // For demo only!!! Changing this involves moving a bunch of states up. 
    const [showInvite, setShowInvite] = useState(true);

    const viewGroup = (groupId: string) => {
        const groupToSet = props.groups.filter(group => {
            return group._id === groupId
        });
        
        props.setCurrentGroup(groupToSet[0]);
        props.setView("group");
    }
    const goBack = () => {
        props.setView(props.previousView);
    }
    return (
        <section className='relative mb-24'>
            <div className=' pt-4 pb-8 flex flex-col items-center'>
                <h2 className='text-detail-prim text-center'>Grupper</h2>
                <img src="/img/separator.svg" alt="" className='w-[50px] mx-auto'/>
            </div>
            {props.invites.length > 0 && showInvite ? props.invites.map(invite => {
                return (
                    <Invite key={`invite_to_${invite._id}`} invite={invite} changeInvites={props.changeInvites} setShowInvite={setShowInvite}/>
                )
            }) : null}
            {props.groups.length > 0 ? <ul className='mb-20'>
                {props.groups.map(group => {
                    return (
                        <li key={group._id} onClick={() => viewGroup(group._id)} className="cursor-pointer">
                            <div className='relative flex flex-col items-center outline outline-[2px] outline-detail-sec outline-offset-[-2px] bg-bg-sec w-[360px] mx-auto mb-8'>
                                <div className='bg-bg-main relative'>
                                    <img src="/img/rectangle-border(3).svg" alt="" className='relative top-[3px]'/>
                                </div>
                                <h3>{group.name}</h3>
                                <h4>Members:</h4>
                                <ul>
                                    {group.users.map(user => {
                                        return <li key={user}>{user}</li>
                                    })}
                                </ul>
                                <div className='bg-bg-main relative'>
                                    <img src="/img/rectangle-border(3).svg" alt="" className='rotate-180 relative top-[-1px] left-[-1px]'/>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul> : <div className='mx-auto px-4'>
                        <p className='text-detail-prim text-lg'>Här var det tomt. Klicka på plussknappen i nedre högra hörnet för att skapa en ny lista.</p>
                    </div>}
            <Floaties goBack={goBack} setIsOpen={setNewGroupIsOpen}/>
            <Modal isOpen={newGroupIsOpen} style={{content: {backgroundColor: '#F4F0E1', position: 'fixed', border: '3px solid #DCC67A', top: '200px', bottom: 'unset', margin: 'auto 0'}}}>
                <NewGroup setIsOpen={setNewGroupIsOpen} groups={props.groups} setGroups={props.setGroups}/>
            </Modal>
        </section>
    );
};

export default Groups;