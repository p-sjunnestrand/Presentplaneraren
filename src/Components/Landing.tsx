import Welcome from './Welcome';

interface Props{
    setView: (view: string) => void,
    matches: boolean,
}

const Landing = (props: Props) => {
    return (
        // All these media queries in class should be made by tailwind's own functionality!
        <div className={`flex ${props.matches ? "my-auto" : "flex-col"}`}>
            <button className={`relative border-2 border-detail-sec shadow-button ${props.matches ? "h-16 w-56 text-2xl mx-auto hover:bg-detail-prim hover:text-bg-minor" : "mt-36 w-[131px] h-12 "}`}>
                <img src={props.matches ? "/img/large-button.svg" : "/img/button-border.svg"} alt="" aria-hidden="true" className="absolute top-0" onClick={() => props.setView("login")}/>
                Inloggning
            </button>
            <button className={`relative border-2 border-detail-sec shadow-button ${props.matches ? "h-16 w-56 text-2xl mx-auto hover:bg-detail-prim hover:text-bg-minor" : "mt-4 w-[131px] h-12"}`} onClick={() => props.setView("register")}>
                <img src={props.matches ? "/img/large-button.svg" : "/img/button-border.svg"} alt="" aria-hidden="true" className="absolute top-0"/>
                Skapa konto
            </button>
            {/* <img src="/img/ballon-trunk-yellow.svg" alt="" className="absolute"/>
            <img src="/img/ballon-trunk-red.svg" alt="" className="absolute"/>
            <img src="/img/ballon-trunk-brown.svg" alt="" className="absolute top-[280px] left-[37px]"/>
            <img src="/img/ballon-tail-brown.svg" alt="" className="absolute top-[183px] left-[265px]"/>
            <img src="/img/ballon-tail-yellow.svg" alt="" className="absolute top-[231px] left-[247px]"/>
            <img src="/img/ballon-tail-red.svg" alt="" className="absolute top-[254px] left-[276px]"/> */}
            {/* <img src="/img/Elephant.png" alt="" className="absolute z-10 top-[361px]"/> */}
             
        </div>
    );
};

export default Landing;