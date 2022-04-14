import { useState, useEffect } from "react";


interface Props {
    user: IUser|undefined
    setView: (view: string) => void,
}
const ListsPrev = (props: Props) => {
    
    return (
        <article onClick={() => props.setView("lists")} className="relative border-detail-sec border-2 w-3/4 p-4 mt-4 cursor-pointer h-[88px] w-80 shadow-button pl-10">
            <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
            <h2>Dina listor</h2>
            {/* This shouldn't be taken from user but rather from lists since it's already currated. Same goes for groups */}
            <p>Antal: {props.user?.lists.length}</p>
            {/* <ul>
                {props.lists?.map(list => {
                    return (
                        <li key={list._id}>{list.title}</li>
                    )
                })}
            </ul> */}
        </article>
    );
};

export default ListsPrev;