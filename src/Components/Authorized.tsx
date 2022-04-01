import Dashboard from "./Dashboard";
import NewList from "./NewList";
import Lists from "./Lists";
import { useState, useEffect } from 'react';
import List from "./List";



const Authorized = () => {
    const [lists, setLists] = useState<IList[]>([]);
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [view, setView] = useState<string>("dashboard");
    const [currentList, setCurrentList] = useState<string>("")

    useEffect(()=> {
        console.log("use effect!");
        
        const fetchLists = async () => {
            console.log("fetchting!");
            
            const fetchResult = await fetch("http://localhost:4000/lists", {
                method: "GET",
                credentials: "include",
            });
            const parsedResult = await fetchResult.json();
            console.log(parsedResult);
            
            setLists(parsedResult.lists);
            setGroups(parsedResult.groups);
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
                return <Dashboard lists={lists} groups={groups} setView={setView}/>;
            case "lists":
                return <Lists lists={lists} setLists={setLists} setView={setView} setCurrentList={setCurrentList}/>;
            case "list":
                return <List lists={lists} currentList={currentList} setView={setView} createItem={createItem}/>
        }
    }
    let currentView = renderSwitch();

    // const newState = [...lists, lists]
    return (
        <>
            {currentView}
            {/* {showCreateList && <NewList lists={lists} setLists={setLists}/>} */}
        </>
    );
};

export default Authorized;