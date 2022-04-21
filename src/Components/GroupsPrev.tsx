
interface Props {
    setView: (view: string) => void,
    groups: IGroup[]
}

const GroupsPrev = (props: Props) => {
    return (
        <section onClick={() => props.setView("groups")} className="relative border-detail-sec border-2 w-3/4 p-4 pl-10 mt-4 cursor-pointer h-[88px] w-80 shadow-button">
            <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
            <h2>Dina grupper</h2>
            <p>Antal: {props.groups.length}</p>
        </section>
    );
};

export default GroupsPrev;