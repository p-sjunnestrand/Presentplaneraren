import { useState } from "react";

interface Props {
    setUser: (authUser: IUser|undefined) => void,
    setView: (view: string) => void,
}
const Login = (props: Props) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // const localAuthURI = "http://localhost:4000/auth/local";
    const localAuthURI = "https://presentplaneraren.herokuapp.com/auth/local";
    // This auth method is disabled for now, but will be implemented in the future. Something in it conflicts with the local method.
    const googleLogin = (): void => {
        window.open("http://localhost:4000/auth/google", "_self");
    }
   
    const localLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const fetchResult = await fetch(localAuthURI, {
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
        props.setUser(resultData.user);
        
    }

    return (
        <>
            <img src="/img/form.svg" alt="" className="absolute top-36 max-w-[60%]"/>
            <h2 className="relative text-2xl top-32">Inloggning</h2>
            <form action="submit" className="relative mt-[8.5rem] flex flex-col items-center" onSubmit={localLogin}>
                <div>
                    <label htmlFor="loginEmail" className="block">E-post</label>
                    <input type="text" name='email' id='loginEmail' value={email} className="h-9" onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}/>
                </div>
                <div>
                    <label htmlFor="loginPassword" className="block">Lösenord</label>
                    <input type="password" name='password' id='loginPassword' value={password} className="h-9" onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}/>
                </div>
                <button className="relative w-[10.313rem] border-2 border-detail-sec h-[3.75rem] shadow-button mt-6 bg-white" type="submit">
                    <img src="/img/button-border.svg" alt="" aria-hidden="true" className="absolute top-0 w-[10.313rem]"/>
                    Logga in
                </button>
            </form>
            <button className="mt-4" onClick={() => props.setView("landing")}>
                <img src="/img/button-back.svg" alt="" className="relative"/>
            </button>
        </>
    );
};

export default Login;