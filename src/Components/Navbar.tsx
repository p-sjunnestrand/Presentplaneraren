interface Props {
    invites: IInvite[],
    logout: () => void,
    setView: (view: string) => void,
}
const Navbar = (props: Props) => {

    
    return (
        <nav className="bg-detail-prim border-t-2 border-detail-sec fixed bottom-0 w-screen">
            <ul className='flex justify-evenly'>
                <li>
                    <button onClick={() => props.setView("dashboard")}>
                        <img src="/img/nav-button.svg" alt="" aira-hidden="true"/>
                        Dashboard
                    </button>
                </li>
                <li>
                    <button onClick={() => props.setView("lists")}>
                        <img src="/img/nav-button.svg" alt="" aira-hidden="true"/>
                        Listor
                    </button>
                </li>
                <li>
                    <button onClick={() => props.setView("groups")}>
                        <img src="/img/nav-button.svg" alt="" aira-hidden="true"/>
                        Grupper
                    </button>
                </li>
                <li>
                    <button onClick={props.logout}>
                        <img src="/img/nav-button.svg" alt="" aira-hidden="true"/>
                        Logga ut
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;