import { Outlet } from 'react-router-dom';
import SidebarMenu from '../shared/SidebarMenu';

const DashboardLayout = () => {
    return (
        <div>
            <SidebarMenu/>
            <Outlet/>
        </div>
    );
};

export default DashboardLayout;