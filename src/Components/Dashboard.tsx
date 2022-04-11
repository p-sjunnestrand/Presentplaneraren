import ListsPrev from './ListsPrev';
import GroupsPrev from './GroupsPrev';
import Navbar from './Navbar';

interface Props {
    lists: IList[]|undefined,
    groups: IGroup[],
    setView: (view: string) => void,
    user: IUser|undefined,
    invites: IInvite[],
}
const Dashboard = (props: Props) => {
    
    return (
        <section>
            <h2>Welcome!</h2>
            <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className='mb-0 mt-4 mx-auto'/>
            <div className="flex flex-col bg-bg-sec items-center">
                <img src="/img/Dashboard-border.svg" alt="" aria-hidden="true"/>
                <ListsPrev user={props.user} setView={props.setView}/>
                <GroupsPrev user={props.user} setView={props.setView}/>
                <button>Inställningar</button>
                <img src="/img/Dashboard-border.svg" alt="" aria-hidden="true" className='rotate-180'/>
            </div>
            <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className='mb-4 mt-0 mx-auto'/>
        </section>
    );
};

export default Dashboard;
