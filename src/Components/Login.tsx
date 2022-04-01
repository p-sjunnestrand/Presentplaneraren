import { useState } from "react";

interface Props {
    setUser: (authUser: Object) => void,
}
const Login = (props: Props) => {
    const googleLogin = (): void => {
        window.open("http://localhost:4000/auth/google", "_self");
    }
   
    const localLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const fetchResult = await fetch("http://localhost:4000/auth/local", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const resultData = await fetchResult.json();
        props.setUser(resultData);
        
    }

    // const getUser = async () => {
    //     const result = await fetch("http://localhost:4000/user", {
    //         method: "GET",
    //         credentials: "include",
    //     });
    //     const data = await result.json();
    //     console.log(data);
        
    // };

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <section>
            <button id="buttonGoogleLogin" onClick={googleLogin}>Google</button>
            <form action="submit">
                <label htmlFor="loginEmail">E-post</label>
                <input type="text" name='email' id='loginEmail' value={email} onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}/>
                <label htmlFor="loginPassword">Lösenord</label>
                <input type="text" name='password' id='loginPassword' value={password} onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}/>
                <button onClick={localLogin}>Logga in</button>
            </form>
            {/* <button onClick={getUser}>Get user</button> */}
        </section>
    );
};

export default Login;