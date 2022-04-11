import Welcome from './Welcome';

interface Props{
    setView: (view: string) => void,
}

const Landing = (props: Props) => {
    return (
        <section className="flex flex-col">
            <header>
            <img src="/img/Top-border.svg" alt="Decorative border" aria-hidden="true" className="w-screen"/>
                <div className="bg-bg-minor py-4 text-center">
                    <h1 className="text-4xl">Presentplaneraren</h1>
                </div>
                <img src="/img/Top-border.svg" alt="Decorative border" aria-hidden="true" className="w-screen"/>
            </header>
            <div className="relative pt-8 grow flex flex-col">
                <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className="w-16 absolute top-5 left-[6%]"/>
                <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className="w-16 absolute top-5 right-[6%]"/>
                <div className="flex grow flex-col items-center">
                    <Welcome setView={props.setView}/>
                </div>
            </div>
        </section>
    );
};

export default Landing;