import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';


function App() {
  const [user, setUser] = useState(null)
  const serverURI = "http://localhost:4000/auth/login/success"

  useEffect(() => {
    console.log("hello!");
      fetch(serverURI, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
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

  return (
    <main>
      <h1>Welcome {user? user.emails[0].value : "guest"}</h1>
      <Login/>
      <Register/>
    </main>
  );
}

export default App;
