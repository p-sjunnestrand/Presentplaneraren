import Login from './Login';
import Register from './Register';

interface Props {
    setUser: (authUser: IUser|undefined) => void,
}

const Unauthorized = (props: Props) => {
    return (
        <>
            <Login setUser={props.setUser}/>
            <Register/>
        </>
    );
};

export default Unauthorized;