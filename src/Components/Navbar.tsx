import React from 'react';

const Navbar = () => {

    const logout = () => {
        window.open("http://localhost:4000/auth/logout", "_self");
    }
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
                    <img src="/img/nav-button.svg" alt="" aira-hidden="true"/>
                    <button onClick={logout}>Logga ut</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;