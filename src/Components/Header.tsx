interface Props {
    user?: undefined | IUser
}

const Header = (props: Props) => {
    return (
        <header>
        {/* <img src="/img/Top-border.svg" alt="Decorative border" aria-hidden="true" className="w-screen"/>  */}
          <div className='bg-top-border-desktop h-[70px]' aria-hidden="true"></div>
          <div className="bg-bg-minor py-[0.5rem] text-center">
              <h1>Presentplaneraren</h1>
              {props.user ? <h2 className='text-base'>Inloggad som {props.user?.email}</h2> : null}
          </div>
          <div className='bg-top-border-desktop h-[70px]' aria-hidden="true"></div>
          {/* <img src="/img/Top-border.svg" alt="Decorative border" aria-hidden="true" className="w-screen"/>  */}
          </header>
    );
};

export default Header;