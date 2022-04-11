import { useState } from "react";

interface Props {
    setGroups: (listsParam: IGroup[])=>void,
    groups: IGroup[],
    setIsOpen: (param: boolean) => void,
}

const NewList = (props: Props) => {

    const [groupTitle, setGroupTitle] = useState<string>("");
    const [newMember, setNewMember] = useState<string>("");
    const [invited, setInvited] = useState<IInvitee[]>([]);
    // const [listGroup, setListGroup] = useState<undefined|string>();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(groupTitle);
        const newGroup: Object = {
            name: groupTitle,
            invited: invited
        }
        const result = await fetch("http://localhost:4000/groups/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGroup)
        });
        if(result.status === 200){
            const parsedResult = await result.json();
            console.log(parsedResult);
            const newGroupState: IGroup[] = [...props.groups, parsedResult];
            props.setGroups(newGroupState);
        } else {
            console.log("Error");
        }
    }
    const searchUser = async () => {
        console.log(newMember);
        
        const fetchResult = await fetch(`http://localhost:4000/groups/find/${newMember}`, {
            method: "GET",
            credentials: "include",
        });
        if(fetchResult.status === 200) {
            const parsedResponse = await fetchResult.json();
            console.log(parsedResponse);
            const newInvited: IInvitee[] = [...invited, parsedResponse];
            setInvited(newInvited);
        } else {
            // Display good message here!
            console.log("No user found");
            
        }
    }

    return (
        <article>
            <h1>ny grupp</h1>
            <form action="submit">
                <div>
                    <label htmlFor="newGroupName">Gruppens namn</label>
                    <input type="text" id="newGroupName" value={groupTitle} name="groupTitle" onChange={(e) => setGroupTitle(e.currentTarget.value)}/>
                </div>
                <div>
                    <label htmlFor="groupMemberInput">Bjud in användare</label>
                    <input type="text" id="groupMemberInput" value={newMember} onChange={(e) => setNewMember(e.currentTarget.value)} placeholder="E-postadress..."/>
                    <button type="button" onClick={searchUser}>Skicka inbjudan</button>
                    <ul>
                        {invited.map(invitee => {
                            return (
                                <li key={invitee.email}>{invitee.email}</li>
                            )
                        })}
                    </ul>
                </div>
                <button type="submit" onClick={handleSubmit}>Skapa grupp</button>
            </form>
            <button onClick={() => props.setIsOpen(false)}>Stäng</button>
        </article>
    );
};

export default NewList;