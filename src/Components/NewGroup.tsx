import { useState } from "react";
import searchUser from './inviteFunction';

interface Props {
    setGroups: (listsParam: IGroup[])=>void,
    groups: IGroup[],
    setIsOpen: (param: boolean) => void,
}

const NewList = (props: Props) => {

    const [groupTitle, setGroupTitle] = useState<string>("");
    const [newMember, setNewMember] = useState<string>("");
    const [invited, setInvited] = useState<IInvitee[]>([]);

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
            props.setIsOpen(false)
        } else {
            console.log("Error");
        }
    }
    
    return (
        <article>
            <h2 className="text-detail-sec text-center">Ny grupp</h2>
            <img src="/img/separator.svg" alt="" className='w-[50px] mx-auto'/>
            <form action="submit" className="mt-8" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="newGroupName">Gruppens namn:</label>
                    <input type="text" id="newGroupName" value={groupTitle} name="groupTitle" onChange={(e) => setGroupTitle(e.currentTarget.value)} required/>
                </div>
                <div className="mt-4">
                    <label htmlFor="groupMemberInput">Bjud in användare:</label>
                    <input type="text" id="groupMemberInput" value={newMember} onChange={(e) => setNewMember(e.currentTarget.value)} placeholder="E-postadress..."/>
                    <button type="button" className="mt-2 relative w-32 h-9 flex flex-col items-center justify-center border border-detail-sec shadow-button bg-white" onClick={() => searchUser(newMember, invited, setInvited)}>
                        <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
                        Hitta användare</button>
                    {invited.length > 0 ? <>
                        <h3 className="mt-2 text-detail-sec underline">Inbjudna</h3>
                        <ul>
                        {invited.map(invitee => {
                            return (
                                <li key={invitee.email}>{invitee.email}</li>
                            )
                        })}
                    </ul>
                    </> : null}
                </div>
                
                <div className="flex w-full mt-20 justify-between">
                    <button type="submit" className="relative w-32 h-9 flex flex-col items-center justify-center border border-detail-sec shadow-button bg-white">
                        <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
                        Skapa grupp
                    </button>
                    <button type="button" className="relative" onClick={() => props.setIsOpen(false)}>
                        <img src="/img/button-close.svg" alt="" className=""/>
                    </button>
                </div>
            </form>
        </article>
    );
};

export default NewList;