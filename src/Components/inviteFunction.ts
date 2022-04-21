const searchUser = async (newMember: string, invited: IInvitee[], setInvited: (invitee: IInvitee[]) => void) => {
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

export default searchUser;