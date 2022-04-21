import Dashboard from "./Dashboard";
import NewList from "./NewList";
import Lists from "./Lists";
import { useState, useEffect } from 'react';
import List from "./List";
import Navbar from "./Navbar";
import Groups from './Groups';
import Group from './Group';

interface Props {
    user: IUser|undefined,
    changeInvites: (id: string, resp: boolean) => void,
}

const Authorized = (props: Props) => {
    const [lists, setLists] = useState<IList[]>([]);
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [view, setView] = useState<string>("dashboard");
    const [currentList, setCurrentList] = useState<IList|undefined>();
    const [invites, setInvites] = useState<IInvite[]>([]);
    const [currentGroup, setCurrentGroup] = useState<IGroup|undefined>();
    
    useEffect(() => {
        if(currentGroup) {
            const fetchGroupLists = async () => {
                const currentGroupId = currentGroup?._id;
                const fetchResult = await fetch(`http://localhost:4000/lists/${currentGroupId}`, {
                    method: "GET",
                    credentials: "include"
                });
                const parsedResponse = await fetchResult.json();
                setLists(parsedResponse);
            }
            fetchGroupLists();
        } else {
        const fetchLists = async () => {

            // This fetch also fetches all groups connected to the user.
            const fetchResult = await fetch("http://localhost:4000/lists", {
                method: "GET",
                credentials: "include",
            });
            const parsedResult = await fetchResult.json();
            
            setLists(parsedResult.lists);
            setGroups(parsedResult.groups);

            if(props.user && props.user.invites.length > 0){
                setInvites(props.user.invites);
            }
        }
        fetchLists();
        }
    }, [currentGroup]);
    
    // Why is this here? Shouldn't it be in lists?
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
        if(fetchResult.status === 200) {
            const parsedResponse = await fetchResult.json();
            const mutatedListState = [...lists];
            mutatedListState.forEach(list => {
                if(list._id === currentList?._id) {
                    list.items = parsedResponse.items.slice();
                }
            });
            setLists(mutatedListState);
        } else {
            console.log("Något gick fel!");
            
        }
    }

  
    const renderSwitch = () => {
        switch(view) {
            case "dashboard":
                return <Dashboard lists={lists} groups={groups} setView={setView} user={props.user} invites={invites} logout={logout}/>;
            case "lists":
                return <Lists
                    lists={lists}
                    setLists={setLists}
                    setView={setView}
                    setCurrentList={setCurrentList}
                    heading="Dina listor"
                    previousView="dashboard"
                    listView={"list"}
                    user={props.user}
                />;
            case "list":
                return <List lists={lists} currentList={currentList} setView={setView} createItem={createItem} setLists={setLists} setCurrentList={setCurrentList} previousView="lists" user={props.user} heading={currentList?.title}/>;
            case "groupList":
                return <List lists={lists} currentList={currentList} setView={setView} createItem={createItem} setLists={setLists} setCurrentList={setCurrentList} previousView="group" currentGroup={currentGroup} user={props.user} heading={currentList?.title}/>;
            case "groups":
                return <Groups
                    groups={groups}
                    setView={setView}
                    setGroups={setGroups}
                    invites={invites}
                    changeInvites={props.changeInvites}
                    setCurrentGroup={setCurrentGroup}
                    previousView="dashboard"
                />
            case "group":
                return <Lists
                    lists={lists}
                    setLists={setLists}
                    setView={setView}
                    setCurrentList={setCurrentList}
                    currentGroup={currentGroup}
                    setCurrentGroup={setCurrentGroup} 
                    heading={currentGroup?.name}
                    previousView="groups"
                    listView="groupList"
                    user={props.user}
                />;
        }
    }

    const logout = () => {
        window.open("http://localhost:4000/auth/logout", "_self");
    }

    let currentView = renderSwitch();

    return (
        <>
            {currentView}
            <Navbar invites={invites} logout={logout} setView={setView}/>
        </>
    );
};

export default Authorized;