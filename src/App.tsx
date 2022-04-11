import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Authorized from './Components/Authorized';
import Unauthorized from './Components/Unauthorized';


function App() {
  const [user, setUser] = useState<undefined | IUser>(undefined)
  const serverURI = "http://localhost:4000/auth/login/success"

  useEffect(() => {
    console.log("hello!");
      fetch(serverURI, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": true,
        },
      })
      .then(response => {
        console.log("hej!");
        if(response.status === 200) {
          return response.json();
        }  
        throw new Error("Authentication failed");
      })
      .then(responseObject => {
        console.log(responseObject);
        
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
      // setUser(parsedResponse);
      console.log(parsedResponse);
      
    }
  }

  return ( 
    <main className='bg-bg-main min-h-screen text-detail-sec overflow-y-auto flex'>
      {user && <Authorized user={user} changeInvites={changeInvites}/>}
      {!user && <Unauthorized setUser={setUser}/>}
      
      {/* <h1>Welcome {user? user.emails[0].value : "guest"}</h1> */}
    </main>
  );
}

export default App;
