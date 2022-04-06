import { useState, useEffect } from "react";


interface Props {
    user: IUser|undefined
    setView: (view: string) => void,
}
const ListsPrev = (props: Props) => {
    
    return (
        <article onClick={() => props.setView("lists")} className="border-detail-prim border-2 w-3/4 rounded-2xl p-4 mt-4 cursor-pointer">
            <h2>Listor</h2>
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