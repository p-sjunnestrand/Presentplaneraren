import { useState, useEffect } from "react";


interface Props {
    setView: (view: string) => void,
    lists: IList[]|undefined,
}
const ListsPrev = (props: Props) => {
    
    return (
        <article onClick={() => props.setView("lists")} className="relative border-detail-sec border-2 w-3/4 p-4 mt-4 cursor-pointer h-[88px] w-80 shadow-button pl-10">
            <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
            <h2>Dina listor</h2>
            <p>Antal: {props.lists?.length}</p>
        </article>
    );
};

export default ListsPrev;