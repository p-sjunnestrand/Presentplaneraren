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
        }
        props.createItem(newItem);
    }
    return (
        <article>
            <h2>Ny artikel</h2>
            <button onClick={() => props.setIsOpen(false)}>Stäng</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="itemName">Namn</label>
                <input type="text" name="itemName" id="itemName" value={itemName} onChange={(e) => setItemName(e.currentTarget.value)}/>
                <label htmlFor="itemDesc">Beskrivning</label>
                <input type="text" name="itemDesc" id="itemDesc" value={itemDesc} onChange={(e) => setItemDesc(e.currentTarget.value)}/>
                <label htmlFor="itemUrl">Ev. webbadress till artikeln</label>
                <input type="text" name="itemUrl" id="itemUrl" value={itemUrl} onChange={(e) => setItemUrl(e.currentTarget.value)}/>
                <label htmlFor="itemStore">Ev. affär där artikeln kan köpas</label>
                <input type="text" name="itemStore" id="itemStore" value={itemStore} onChange={(e) => setItemStore(e.currentTarget.value)}/>
                <button type='submit'>Spara</button>
            </form>
        </article>
    );
};

export default NewItem;