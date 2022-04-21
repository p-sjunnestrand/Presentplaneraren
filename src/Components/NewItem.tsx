import { useState } from "react";

interface Props {
    createItem: (item: IItem) => void,
    setIsOpen: (arg: boolean) => void,
}
const NewItem = (props: Props) => {

    const [itemName, setItemName] = useState<string>("");
    const [itemDesc, setItemDesc] = useState<string>("");
    const [itemUrl, setItemUrl] = useState<string>("");
    const [itemStore, setItemStore] = useState<string>("");

    const handleSubmit= (e: React.SyntheticEvent) => {
        e.preventDefault();
        const newItem = {
            name: itemName,
            desc: itemDesc,
            url: itemUrl,
            store: itemStore,
            taken: "",
        }
        props.createItem(newItem);
    }
    return (
        <article>
            <h2 className="text-detail-sec text-center">Ny artikel</h2>
            <img src="/img/separator.svg" alt="" className='w-[50px] mx-auto'/>
            <form action="submit" className="mt-8" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="itemName">Namn</label><br/>
                    <input type="text" name="itemName" id="itemName" className="border border-detail-sec" value={itemName} onChange={(e) => setItemName(e.currentTarget.value)} required/>
                </div>
                <div className="mt-4">
                    <label htmlFor="itemDesc">Beskrivning</label><br/>
                    <input type="text" name="itemDesc" id="itemDesc" className="border border-detail-sec" value={itemDesc} onChange={(e) => setItemDesc(e.currentTarget.value)}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="itemUrl">Ev. webbadress till artikeln</label><br/>
                    <input type="text" name="itemUrl" id="itemUrl" className="border border-detail-sec" value={itemUrl} onChange={(e) => setItemUrl(e.currentTarget.value)}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="itemStore">Ev. affär där artikeln kan köpas</label><br/>
                    <input type="text" name="itemStore" id="itemStore" className="border border-detail-sec" value={itemStore} onChange={(e) => setItemStore(e.currentTarget.value)}/>
                </div>
                <button type="submit" className="mt-4 relative w-32 h-9 flex flex-col items-center justify-center border border-detail-sec shadow-button">
                    <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
                    Spara
                </button>
            </form>
            <button type="submit" className="mt-4 relative w-32 h-9 flex flex-col items-center justify-center border border-detail-sec shadow-button" onClick={() => props.setIsOpen(false)}>
                <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
                Stäng
            </button>
        </article>
    );
};

export default NewItem;