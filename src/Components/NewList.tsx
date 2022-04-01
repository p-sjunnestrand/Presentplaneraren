import { useState } from "react";
import Lists from "./Lists";

interface Props {
    setLists: (listsParam: IList[])=>void,
    lists: IList[],
    setIsOpen: (param: boolean) => void,
}

const NewList = (props: Props) => {

    const [listTitle, setListTitle] = useState<undefined|string>();
    const [listGroup, setListGroup] = useState<undefined|string>();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(listTitle);
        const result = await fetch("http://localhost:4000/lists/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: listTitle})
        });
        if(result.status === 200){
            const parsedResult = await result.json();
            console.log(parsedResult);
            const newListState: IList[] = [...props.lists, parsedResult];
            props.setLists(newListState);
        } else {
            console.log("Error");
        }
        
       
    }
    return (
        <article className="newListModal">
            <h1>ny lista</h1>
            <form action="submit">
                <div className="newListSubWrapper">
                    <label htmlFor="newListName">Titel</label>
                    <input type="text" id="newListName" onChange={(e) => setListTitle(e.currentTarget.value)}/>
                </div>
                <div className="newListSubWrapper">
                    <label htmlFor="personalList">Personlig lista</label>
                    <input type="checkbox" id="personalList"/>
                </div>
                <div className="newListSubWrapper">
                    <label htmlFor="newListGroup">Grupp</label>
                    <select name="newListGroup" id="newListGroup">
                        <option value="filler">Filler</option>
                    </select>
                </div>
                <button type="submit" onClick={handleSubmit}>Skapa lista</button>
            </form>
            <button onClick={() => props.setIsOpen(false)}>Stäng</button>
        </article>
    );
};

export default NewList;