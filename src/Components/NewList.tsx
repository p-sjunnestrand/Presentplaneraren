import { useState } from "react";
import Lists from "./Lists";

interface Props {
    setLists: (listsParam: IList[])=>void,
    lists: IList[],
    setIsOpen: (param: boolean) => void,
    currentGroup?: IGroup|undefined,
}

const NewList = (props: Props) => {

    const [listTitle, setListTitle] = useState<undefined|string>();
    const [listGroup, setListGroup] = useState<undefined|string>();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(listTitle);
        const newList = {
            title: listTitle,
            inGroup: props.currentGroup ? props.currentGroup._id : null,
        }
        console.log(newList);
        
        const result = await fetch("http://localhost:4000/lists/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newList)
        });
        if(result.status === 200){
            const parsedResult = await result.json();
            console.log(parsedResult);
            const newListState: IList[] = [...props.lists, parsedResult];
            props.setLists(newListState);
            props.setIsOpen(false);
        } else {
            console.log("Error");
        }
        
       
    }
    return (
        <>
        {/* <article className="newListModal"> */}
            <h2 className="text-detail-sec text-center">Ny lista</h2>
            <img src="/img/separator.svg" alt="" className='w-[50px] mx-auto'/>
            <form action="submit" className="mt-8">
                <div className="flex">
                    <label htmlFor="newListName" className="">Titel:</label>
                    <input type="text" id="newListName" className="ml-4 border border-detail-sec" onChange={(e) => setListTitle(e.currentTarget.value)}/>
                </div>
                <div className="flex mt-4">
                    <label htmlFor="newListGroup" className="">Grupp:</label>
                    <select name="newListGroup" id="newListGroup" className="ml-4 bg-white border border-detail-sec">
                        <option value="filler">Filler</option>
                    </select>
                </div>
                <button type="submit" className="mt-4 relative w-32 h-9 flex flex-col items-center justify-center border border-detail-sec shadow-button" onClick={handleSubmit}>
                    <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
                    Skapa lista
                </button>
            </form>
            <button type="submit" className="mt-4 relative w-32 h-9 flex flex-col items-center justify-center border border-detail-sec shadow-button" onClick={() => props.setIsOpen(false)}>
                <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
                Stäng
            </button>
        {/* </article> */}
        </>
    );
};

export default NewList;