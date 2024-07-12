import Navbar from '../shared/NavbarItems';
import Footer from '../shared/Footer';
import { Outlet } from 'react-router-dom';
import LoadPageTop from '../LoadPageTop/LoadPageTop';
import ScrollUpBtn from '../LoadPageTop/ScrollUpBtn';

const MainLayout = () => {
    return (
      <div>
        <LoadPageTop />
        <ScrollUpBtn />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
};

export default MainLayout;