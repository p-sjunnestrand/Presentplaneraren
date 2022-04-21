import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';

interface Props {
    setUser: (authUser: IUser|undefined) => void,
    matches: boolean,
}

const Unauthorized = (props: Props) => {
    const [view, setView] = useState("landing");

    const viewRender = () => {
        switch(view) {
            case "landing":
                return <Landing setView={setView} matches={props.matches}/>
            case "login":
                return <Login setUser={props.setUser} setView={setView}/>
            case "register":
                return <Register setView={setView} setUser={props.setUser}/>
            
        }
    }
    return (
        <section className={`relative pt-8 grow flex flex-col`}>
            {!props.matches && <>
                <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className="w-16 absolute top-5 left-[6%]"/>
                <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className="w-16 absolute top-5 right-[6%]"/>
                <div className="flex grow flex-col items-center">
                    <img src="/img/elephant-portal.png" alt="" aria-hidden="true" className="absolute left-0 right-0 mx-auto min-w-[345px] max-w-[80%] z-0"/>

                    {viewRender()}
                </div>
            </>}
            {props.matches && <>
                <div className='flex'>
                    <div className='flex flex-col h-[1000px] justify-evenly items-center w-[15%]'>
                        <img src="/img/decorative-star.svg" alt="" className='w-32'/>
                        <img src="/img/decorative-star.svg" alt="" className='w-32'/>
                        <img src="/img/decorative-star.svg" alt="" className='w-32'/>
                    </div>
                    <div className="flex grow flex-col items-center">
                        <img src="/img/elephant-portal-desktop.png" alt="" aria-hidden="true" className="absolute left-0 right-0 mx-auto min-w-[345px] max-w-[80%] z-0"/>
                        {viewRender()}
                    </div>
                    <div className='flex flex-col h-[1000px] justify-evenly items-center w-[15%]'>
                        <img src="/img/decorative-star.svg" alt="" className='w-32'/>
                        <img src="/img/decorative-star.svg" alt="" className='w-32'/>
                        <img src="/img/decorative-star.svg" alt="" className='w-32'/>
                    </div>
                </div>
            </>}
        </section>
    );
};

export default Unauthorized;