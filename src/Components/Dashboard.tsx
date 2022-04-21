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
            <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className='mb-0 mt-4 mx-auto'/>
            <div className="flex flex-col bg-bg-sec items-center">
                {/* This image needs to have a og w res of min 480 px! Fix in figma */}
                <img src="/img/Dashboard-border.svg" alt="" aria-hidden="true" className='w-[485px]'/>
                <ListsPrev lists={props.lists} setView={props.setView}/>
                <GroupsPrev setView={props.setView} groups={props.groups}/>
                {/* <DashboardButton heading="Inställningar" click={() => props.setView("settings")} view="settings"/> */}
                <article className="relative border-slate-400 border-2 p-4 mt-4 h-16 w-56 shadow-button text-center cursor-default" role="button">
                    <img src="/img/large-button.svg" alt="" className="absolute top-0 left-0"/>
                    <h2 className='text-slate-400'>Inställningar</h2>
                </article>
                <DashboardButton heading="Logga ut" click={props.logout} view="settings"/>
                <img src="/img/Dashboard-border.svg" alt="" aria-hidden="true" className='rotate-180 mt-4 w-[485px]'/>
            </div>
            <img src="/img/decorative-star.svg" alt="" aria-hidden="true" className='mb-4 mt-0 mx-auto'/>
        </section>
    );
};

export default Dashboard;
