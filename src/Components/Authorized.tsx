import Dashboard from "./Dashboard";
import NewList from "./NewList";
import Lists from "./Lists";
import { useState, useEffect } from 'react';
import List from "./List";
import Navbar from "./Navbar";
import Groups from './Groups';

interface Props {
    user: IUser|undefined,
    changeInvites: (id: string, resp: boolean) => void,
}

const Authorized = (props: Props) => {
    const [lists, setLists] = useState<IList[]>([]);
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [view, setView] = useState<string>("dashboard");
    const [currentList, setCurrentList] = useState<string>("");
    const [invites, setInvites] = useState<IInvite[]>([]);

    useEffect(()=> {
        console.log("use effect!");
        
        const fetchLists = async () => {
            console.log("fetchting!");

            // This fetch also fetches all groups connected to the user.
            const fetchResult = await fetch("http://localhost:4000/lists", {
                method: "GET",
                credentials: "include",
            });
            const parsedResult = await fetchResult.json();
            console.log(parsedResult);
            
            setLists(parsedResult.lists);
            setGroups(parsedResult.groups);

            if(props.user && props.user.invites.length > 0){
                setInvites(props.user.invites);
            }
        }
        fetchLists();
    }, []);
    

    

    const createItem = async (item: IItem) => {
        const itemObject = {
            list: currentList,
            item: item,
        }
        const fetchResult = await fetch("http://localhost:4000/lists/items/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemObject)
        });
    }

  
    const renderSwitch = () => {
        switch(view) {
            case "dashboard":
                return <Dashboard lists={lists} groups={groups} setView={setView} user={props.user} invites={invites}/>;
            case "lists":
                return <Lists lists={lists} setLists={setLists} setView={setView} setCurrentList={setCurrentList}/>;
            case "list":
                return <List lists={lists} currentList={currentList} setView={setView} createItem={createItem}/>;
            case "groups":
                return <Groups groups={groups} setView={setView} setGroups={setGroups} invites={invites} changeInvites={props.changeInvites}/>
        }
    }
    let currentView = renderSwitch();

    // const newState = [...lists, lists]
    return (
        <>
            <img src="/img/Top-border.svg" alt="Decorative border" aria-hidden="true" className="w-screen"/>
            {currentView}
            <Navbar invites={invites}/>
            {/* {showCreateList && <NewList lists={lists} setLists={setLists}/>} */}
        </>
    );
};

export default Authorized;