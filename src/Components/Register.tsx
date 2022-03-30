import { useState } from "react";

const Register = () => {
    // const [userInfo, setUserInfo] = useState(
    //     {
    //         userEmail: "",
    //         userPassword: "",
    //         userNameFirst: "",
    //         userNameLast: "",
    //     }
    // );
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [userNameFirst, setUserNameFirst] = useState<undefined | string>(undefined);
    const [userNameLast, setUserNameLast] = useState<undefined | string>(undefined);

    const registerUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const fetchResult = await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nameFirst: userNameFirst,
                nameLast: userNameLast,
                password: userPassword,
                email: userEmail
            })
        });
        if(fetchResult.status === 200) {
            const resultData = await fetchResult.json();
            console.log(resultData);
        } else if(fetchResult.status === 409) {
            console.log("Email upptagen");
            
        } else {
            console.log("Something went wrong");
            
        }
        
    }
    return (
        <section>
            <h1>Skapa ett nytt konto</h1>
            <form action="submit">
                <label htmlFor="inputNewEmail">E-post</label>
                <input type="text" id="inputNewEmail" required value={userEmail} onChange={(e: React.FormEvent<HTMLInputElement>) => setUserEmail(e.currentTarget.value)}/>
                <label htmlFor="inputNewPassword">Lösenord</label>
                <input type="password" id="inputNewPassword" required value={userPassword} onChange={(e: React.FormEvent<HTMLInputElement>) => setUserPassword(e.currentTarget.value)}/>
                <label htmlFor="inputConfirmPassword">Upprepa lösenordet</label>
                <input type="password" id="inputConfirmPassword" required value={confirmPassword} onChange={(e: React.FormEvent<HTMLInputElement>) => setConfirmPassword(e.currentTarget.value)}/>
                <label htmlFor="inputNameFirst">Förnamn</label>
                <input type="text" id="inputNameFirst" value={userNameFirst} onChange={(e: React.FormEvent<HTMLInputElement>) => setUserNameFirst(e.currentTarget.value)}/>
                <label htmlFor="inputNameLast">Efternamn</label>
                <input type="text" id="inputNameLast" value={userNameLast} onChange={(e: React.FormEvent<HTMLInputElement>) => setUserNameLast(e.currentTarget.value)}/>
                <button onClick={registerUser}>Spara</button>
            </form>
        </section>
    );
};

export default Register;