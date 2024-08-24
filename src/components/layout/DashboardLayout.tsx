import { Outlet } from 'react-router-dom';
import SidebarMenu from '../shared/SidebarMenu';
import { Helmet } from 'react-helmet-async';

const DashboardLayout = () => {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <div className="relative min-h-screen md:flex">
          <SidebarMenu />
          <div className="flex-1  md:ml-64  bg-white">
            <div className="p-5 ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
};

export default DashboardLayout;