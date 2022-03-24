import React from 'react';

const Login = (): JSX.Element => {
    const googleLogin = (): void => {
        window.open("http://localhost:4000/auth/google");
    }
    return (
        <section>
            <button id="buttonGoogleLogin" onClick={googleLogin}>Google</button>
        </section>
    );
};

export default Login;