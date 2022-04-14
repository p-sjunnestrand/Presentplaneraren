import { useState } from "react";

interface Props {
setView: (view: string) => void,
}
const Register = (props: Props) => {
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
        <>
            <img src="/img/form.svg" alt="" className="absolute top-36 max-w-[60%]"/>
            <h2 className="relative text-2xl top-32">Skapa konto</h2>
            <form action="submit" className="relative mt-[8.5rem] flex flex-col items-center" onSubmit={registerUser}>
                <div>
                    <label htmlFor="inputNewEmail" className="block">E-post</label>
                    <input type="text" id="inputNewEmail" required value={userEmail} onChange={(e: React.FormEvent<HTMLInputElement>) => setUserEmail(e.currentTarget.value)}/>
                </div>
                <div>
                    <label htmlFor="inputNewPassword" className="block">Lösenord</label>
                    <input type="password" id="inputNewPassword" required value={userPassword} onChange={(e: React.FormEvent<HTMLInputElement>) => setUserPassword(e.currentTarget.value)}/>
                </div>
                <div>
                    <label htmlFor="inputConfirmPassword" className="block">Upprepa lösenordet</label>
                    <input type="password" id="inputConfirmPassword" required value={confirmPassword} onChange={(e: React.FormEvent<HTMLInputElement>) => setConfirmPassword(e.currentTarget.value)}/>
                </div>
                {/* <label htmlFor="inputNameFirst">Förnamn</label>
                <input type="text" id="inputNameFirst" value={userNameFirst} onChange={(e: React.FormEvent<HTMLInputElement>) => setUserNameFirst(e.currentTarget.value)}/>
                <label htmlFor="inputNameLast">Efternamn</label>
                <input type="text" id="inputNameLast" value={userNameLast} onChange={(e: React.FormEvent<HTMLInputElement>) => setUserNameLast(e.currentTarget.value)}/> */}
                <button type="submit" className="relative w-[10.313rem] border-2 border-detail-sec h-[3.75rem] shadow-button mt-4 bg-white">
                    <img src="/img/button-border.svg" alt="" aria-hidden="true" className="absolute top-0 w-[10.313rem]"/>
                    Skapa konto
                </button>
            </form>
            <button className="mt-4" onClick={() => props.setView("landing")}>
                <img src="/img/button-back.svg" alt="" className="relative"/>
            </button>
        </>
    );
};

export default Register;