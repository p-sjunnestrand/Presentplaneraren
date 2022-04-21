import { useEffect, useState } from 'react';
import './App.css';
import Authorized from './Components/Authorized';
import Unauthorized from './Components/Unauthorized';


function App() {
  const [user, setUser] = useState<undefined | IUser>(undefined);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1200px)").matches
  )
  const serverURI = "http://localhost:4000/auth/login/success";

  // This meida query is used for image sources
  useEffect(() => {
    window.matchMedia("(min-width: 1200px) and (max-width: 1400px)").addEventListener('change', e => setMatches( e.matches ));
  }, []);

  useEffect(() => {
      fetch(serverURI, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        if(response.status === 200) {
          return response.json();
        }  
        throw new Error("Authentication failed");
      })
      .then(responseObject => {
        // console.log(responseObject);
        setUser(responseObject.user);
      })
      .catch(err => {
        console.log(err);
      })
   
  }, []);

  const changeInvites = async (id: string, resp: boolean) => {
    const inviteResponse = {
      id: id,
      response: resp 
    }
    const fetchResult = await fetch("http://localhost:4000/groups/invites", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inviteResponse)
    });
    if(fetchResult.status === 200) {
      const parsedResponse = await fetchResult.json();
      setUser(parsedResponse.user);
    }
  }

  return ( 
    <main className={`bg-bg-main min-h-screen text-detail-sec overflow-y-auto flex flex-col`}>
      <header>
            {/* <img src="/img/Top-border.svg" alt="Decorative border" aria-hidden="true" className="w-screen"/> */}
                <div className='bg-top-border-desktop h-[70px]' aria-hidden="true"></div>
                <div className="bg-bg-minor py-[0.5rem] text-center">
                    <h1>Presentplaneraren</h1>
                    {user ? <h2 className='text-base'>Inloggad som {user?.email}</h2> : null}
                </div>
                <div className='bg-top-border-desktop h-[70px]' aria-hidden="true"></div>
                {/* <img src="/img/Top-border.svg" alt="Decorative border" aria-hidden="true" className="w-screen"/> */}
            </header>
      {user && <Authorized user={user} changeInvites={changeInvites}/>}
      {!user && <Unauthorized setUser={setUser} matches={matches}/>}
    </ main>
  );
}

export default App;
