interface Props {
    invites: IInvite[],
    logout: () => void,
}
const Navbar = (props: Props) => {

    
    return (
        <nav className="bg-detail-prim border-t-2 border-detail-sec fixed bottom-0 w-screen">
            <ul className='flex justify-evenly'>
                <li>
                    <img src="/img/nav-button.svg" alt="" aira-hidden="true"/>
                    <button>Dashboard</button>
                </li>
                <li>
                    <img src="/img/nav-button.svg" alt="" aira-hidden="true"/>
                    <button>Listor</button>
                </li>
                <li>
                    <img src="/img/nav-button.svg" alt="" aira-hidden="true"/>
                    <button>Inställningar</button>
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