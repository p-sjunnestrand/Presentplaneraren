
interface Props {
    user: IUser|undefined,
    setView: (view: string) => void,
}

const GroupsPrev = (props: Props) => {
    return (
        <section onClick={() => props.setView("groups")} className="cursor-pointer">
            <h2>Grupper</h2>
            <p>Antal: {props.user?.groups.length}</p>
            {/* <ul>
                {props.groups.map(group => {
                    return (
                        <li key={group._id}>{group.name}</li>
                    )
                })}
            </ul> */}
        </section>
    );
};

export default GroupsPrev;