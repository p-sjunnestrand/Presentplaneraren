import ListsPrev from './ListsPrev';
import GroupsPrev from './GroupsPrev';
import DashboardButton from './DashboardButton';

interface Props {
    lists: IList[]|undefined,
    groups: IGroup[],
    setView: (view: string) => void,
    user: IUser|undefined,
    invites: IInvite[],
    logout: () => void,
}
const Dashboard = (props: Props) => {
    
    return (
        <section>
            {/* <h2>Welcome!</h2> */}
            <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className='mb-0 mt-4 mx-auto'/>
            <div className="flex flex-col bg-bg-sec items-center">
                {/* This image needs to have a og w res of min 480 px! Fix in figma */}
                <img src="/img/Dashboard-border.svg" alt="" aria-hidden="true"/>
                <ListsPrev user={props.user} setView={props.setView}/>
                <GroupsPrev user={props.user} setView={props.setView}/>
                <DashboardButton heading="Inställningar" click={() => props.setView("settings")} view="settings"/>
                <DashboardButton heading="Logga ut" click={props.logout} view="settings"/>
                {/* <button>Inställningar</button> */}
                <img src="/img/Dashboard-border.svg" alt="" aria-hidden="true" className='rotate-180 mt-4'/>
            </div>
            <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className='mb-4 mt-0 mx-auto'/>
        </section>
    );
};

export default Dashboard;
