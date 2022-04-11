import Modal from 'react-modal';
import { useState } from 'react';
import NewGroup from './NewGroup';
import Invite from './Invite';

interface Props {
    groups: IGroup[],
    setGroups: (groupsParam: IGroup[])=>void,
    setView: (view: string) => void,
    invites: IInvite[],
    changeInvites: (id: string, resp: boolean) => void,
}

const Groups = (props: Props) => {

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);


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
                        <li key={group._id}>{group.name}</li>
                    )
                })}
            </ul>
            <button onClick={() => setIsOpen(true)}>Ny grupp</button>
            <Modal isOpen={modalIsOpen} >
                <NewGroup setIsOpen={setIsOpen} groups={props.groups} setGroups={props.setGroups}/>
            </Modal>
        </section>
    );
};

export default Groups;