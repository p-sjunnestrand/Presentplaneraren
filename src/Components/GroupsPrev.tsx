
interface Props {
    groups: IGroup[],
}

const GroupsPrev = (props: Props) => {
    return (
        <section>
            <h2>Grupper</h2>
            <ul>
                {props.groups.map(group => {
                    return (
                        <li key={group._id}>{group.name}</li>
                    )
                })}
            </ul>
        </section>
    );
};

export default GroupsPrev;