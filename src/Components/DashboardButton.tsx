
interface Props {
    heading: string,
    click: () => void,
    view: string
}

const DashboardButton = (props: Props) => {
    return (
        <article className="relative border-detail-sec border-2 p-4 mt-4 cursor-pointer h-16 w-56 shadow-button text-center" role="button" onClick={props.click}>
            <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
            <h2>{props.heading}</h2>
        </article>
    );
};

export default DashboardButton;