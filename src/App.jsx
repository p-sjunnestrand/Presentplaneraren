import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';

const serverURI = "http://localhost:4000/auth/login/success"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log("hello!");
    
      // fetch("http://localhost:4000")
      // .then(res => res.json())
      // .then(data => {
      //   console.log(data);
      // })
      fetch(serverURI, {
        method: "GET",
        credentials: "include",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": true,
        },
      })
      .then(response => {
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
  return (
    <main>
      <h1>Welcome {user? user : "guest"}</h1>
      <Login/>

    </main>
  );
}

export default App;
