import Navbar from '../shared/NavbarItems';
import Footer from '../shared/Footer';
import { Outlet } from 'react-router-dom';
import LoadPageTop from '../LoadPageTop/LoadPageTop';
import ScrollUpBtn from '../LoadPageTop/ScrollUpBtn';
import WishList from '../WishList/WishList';

const MainLayout = () => {
    return (
      <div>
        <LoadPageTop />
        <WishList/>
        <ScrollUpBtn />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
};

export default MainLayout;