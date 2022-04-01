import { useState, useEffect } from "react";


interface Props {
    lists: IList[]|undefined,
    setView: (view: string) => void,
}
const ListsPrev = (props: Props) => {
    
    return (
        <section onClick={() => props.setView("lists")}>
            <h2>Listor</h2>
            <ul>
                {props.lists?.map(list => {
                    return (
                        <li key={list._id}>{list.title}</li>
                    )
                })}
            </ul>
        </section>
    );
};

export default ListsPrev;