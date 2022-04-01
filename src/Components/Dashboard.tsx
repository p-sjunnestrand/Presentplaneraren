import ListsPrev from './ListsPrev';
import GroupsPrev from './GroupsPrev';
import Navbar from './Navbar';

interface Props {
    lists: IList[]|undefined,
    groups: IGroup[],
    setView: (view: string) => void,
}
const Dashboard = (props: Props) => {
    
    return (
        <section>
            <ListsPrev lists={props.lists} setView={props.setView}/>
            <GroupsPrev groups={props.groups}/>
            <button>Inställningar</button>
            <Navbar/>
        </section>
    );
};

export default Dashboard;