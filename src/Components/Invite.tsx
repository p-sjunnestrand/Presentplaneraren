interface Props {
    invite: IInvite,
    changeInvites: (id: string, resp: boolean) => void,
}

const Invite = (props: Props) => {
    return (
        <div>
            <p>{`${props.invite.owner} har bjudit in dig till gruppen ${props.invite.name}.`}</p>
            <button onClick={() => props.changeInvites(props.invite._id, true)}>Acceptera</button>
            <button onClick={() => props.changeInvites(props.invite._id, false)}>Avböj</button>            
        </div>
    );
};

export default Invite;