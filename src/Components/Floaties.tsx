interface Props {
    goBack: () => void,
    setIsOpen: (boolean: boolean) => void,
}

const Floaties = (props: Props) => {
    return (
        <div className='fixed flex justify-between w-full bottom-28' id="floaties">
            <button className="ml-4" onClick={props.goBack}>
                <img src="/img/button-back.svg" alt="" className="relative"/>
            </button>
            <button className="mr-4" onClick={() => props.setIsOpen(true)}>
                <img src="/img/button-add.svg" alt="" className="relative"/>
            </button>
        </div>
    );
};

export default Floaties;