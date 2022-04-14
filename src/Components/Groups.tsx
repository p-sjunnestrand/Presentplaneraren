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

    const viewGroup = (groupId: string) => {
        const groupToSet = props.groups.filter(group => {
            return group._id === groupId
        });
        console.log(groupToSet);
        
        props.setCurrentGroup(groupToSet[0]);
        props.setView("group");
    }
    const goBack = () => {
        props.setView(props.previousView);
    }
    return (
        <section>
            <h2>Grupper</h2>
            {props.invites.length > 0 ? props.invites.map(invite => {
                return (
                    <Invite key={`invite_to_${invite._id}`} invite={invite} changeInvites={props.changeInvites}/>
                )
            }) : null}
            <ul>
                {props.groups.map(group => {
                    return (
                        <li key={group._id} onClick={() => viewGroup(group._id)}>{group.name}</li>
                    )
                })}
            </ul>
            {/* <button onClick={() => setIsOpen(true)}>Ny grupp</button> */}
            <Floaties goBack={goBack} setIsOpen={setNewGroupIsOpen}/>
            <Modal isOpen={newGroupIsOpen} >
                <NewGroup setIsOpen={setNewGroupIsOpen} groups={props.groups} setGroups={props.setGroups}/>
            </Modal>
        </section>
    );
};

export default Groups;