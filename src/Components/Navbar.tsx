import React from 'react';

const Navbar = () => {

    const logout = () => {
        window.open("http://localhost:4000/auth/logout", "_self");
    }
    return (
        <nav>
            <ul>
                <li>
                    <button>Dashboard</button>
                </li>
                <li>
                    <button>Listor</button>
                </li>
                <li>
                    <button>Inställningar</button>
                </li>
                <li>
                    <button onClick={logout}>Logga ut</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;