import React, { useState } from 'react';
import searchUser from './inviteFunction';

interface Props {
    currentGroup: IGroup|undefined,
    setIsOpen: (state: boolean) => void,
}
const GroupInfo = (props: Props) => {

    const [newMember, setNewMember] = useState<string>("");
    const [invited, setInvited] = useState<IInvitee[]>([]);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const newInvites = {
            group: props.currentGroup?._id,
            invites: invited
        }
        console.log(newInvites);
        const fetchResult = await fetch("http://localhost:4000/groups/newInvite", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newInvites)
        })
    }

    return (
        <article>
            <h2>Medlemmar i {props.currentGroup?.name}</h2>
            <ul>
                {props.currentGroup?.users.map(user => {
                    return <li key={user}>{user}</li>
                })}
            </ul>
            <form action="submit" onSubmit={handleSubmit}>
            <div>
                    <label htmlFor="groupMemberInput">Bjud in användare</label>
                    <input type="text" id="groupMemberInput" value={newMember} onChange={(e) => setNewMember(e.currentTarget.value)} placeholder="E-postadress..."/>
                    <button type="button" onClick={() => searchUser(newMember, invited, setInvited)}>Hitta användare</button>
                    <ul>
                        {invited.map(invitee => {
                            return (
                                <li key={invitee.email}>{invitee.email}</li>
                            )
                        })}
                    </ul>
                </div>
                <button type="submit">Bjud in</button>
            </form>
            <button onClick={() => props.setIsOpen(false)}>Stäng</button>
        </article>
    );
};

export default GroupInfo;