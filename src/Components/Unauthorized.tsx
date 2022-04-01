import Login from './Login';
import Register from './Register';

interface Props {
    setUser: (authUser: Object) => void,
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