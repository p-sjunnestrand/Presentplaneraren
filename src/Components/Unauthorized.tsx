import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';
// import Welcome from './Welcome';

interface Props {
    setUser: (authUser: IUser|undefined) => void,
}

const Unauthorized = (props: Props) => {
    const [view, setView] = useState("landing");

    const viewRender = () => {
        switch(view) {
            case "landing":
                return <Landing setView={setView}/>
            case "login":
                return <Login setUser={props.setUser} setView={setView}/>
            case "register":
                return <Register setView={setView}/>
            
        }
    }
    return (
        <>
        {/* <section className="flex flex-col"> */}
            {/* <header>
            <img src="/img/Top-border.svg" alt="Decorative border" aria-hidden="true" className="w-screen"/>
                <div className="bg-bg-minor py-4 text-center">
                    <h1 className="text-4xl">Presentplaneraren</h1>
                </div>
                <img src="/img/Top-border.svg" alt="Decorative border" aria-hidden="true" className="w-screen"/>
            </header> */}
            <section className="relative pt-8 grow flex flex-col">
                <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className="w-16 absolute top-5 left-[6%]"/>
                <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className="w-16 absolute top-5 right-[6%]"/>
                <div className="flex grow flex-col items-center">
                    {/* <Welcome setView={setView}/> */}
                    <img src="/img/elephant-portal.png" alt="" aria-hidden="true" className="absolute left-0 right-0 mx-auto min-w-[345px] max-w-[80%] z-0"/>

                    {viewRender()}
                </div>
            </section>
        {/* </section> */}
        </>
    );
};

export default Unauthorized;