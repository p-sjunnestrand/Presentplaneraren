import { useEffect, useState } from 'react';
import './App.css';
import Authorized from './Components/Authorized';
import Unauthorized from './Components/Unauthorized';
import Header from './Components/Header';


function App() {
  const [user, setUser] = useState<undefined | IUser>(undefined);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1200px)").matches
  )
  const serverURI = "http://localhost:4000/auth/login/success";

  // This meida query is used for image sources
  useEffect(() => {
    window.matchMedia("(min-width: 1200px)").addEventListener('change', e => setMatches( e.matches ));
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
    <main className={`bg-bg-main min-h-screen text-detail-sec overflow-y-auto flex flex-col overflow-hidden`}>
      
        <Header user={user}/>
       
      {user && <Authorized user={user} changeInvites={changeInvites}/>}
      {!user && <Unauthorized setUser={setUser} matches={matches}/>}
    </ main>
  );
}

export default App;
