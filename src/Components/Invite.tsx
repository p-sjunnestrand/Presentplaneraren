interface Props {
    invite: IInvite,
    changeInvites: (id: string, resp: boolean) => void,
    setShowInvite: (p: boolean) => void,
}

const Invite = (props: Props) => {

    const handleClick = (id: string, answer: boolean) => {
        props.changeInvites(id, answer);
        props.setShowInvite(false);
    }
    return (
        <div className="border border-detail-sec w-11/12 mx-auto mb-8 bg-bg-sec p-4">
            <p>{`${props.invite.owner} har bjudit in dig till gruppen ${props.invite.name}.`}</p>
            <div className="flex justify-between">
                <button type="submit" className="mt-4 relative w-32 h-9 flex flex-col items-center justify-center border border-detail-sec shadow-button" onClick={() => handleClick(props.invite._id, true)}>
                    <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
                    Acceptera
                </button>
                <button type="submit" className="mt-4 relative w-32 h-9 flex flex-col items-center justify-center border border-detail-sec shadow-button" onClick={() => handleClick(props.invite._id, false)}>
                    <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
                    Avböj
                </button>
            </div>
        </div>
    );
};

export default Invite;