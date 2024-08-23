import { Outlet } from "react-router-dom";
import UserNavMenu from "../shared/UserNavMenu";
import NavbarItems from "../shared/NavbarItems";
import WishList from "../WishList/WishList";
import ScrollUpBtn from "../LoadPageTop/ScrollUpBtn";
import Footer from "../shared/Footer";
import LoadPageTop from "../LoadPageTop/LoadPageTop";

const ProfileLayout = () => {
  return (
    <div>
      <LoadPageTop />
      <NavbarItems />
      <div className="mt-[100px] sm:pt-5 max-w-4xl mx-auto">
        <UserNavMenu />
        <Outlet />
      </div>
      <WishList />
      <ScrollUpBtn />
      <Footer />
    </div>
  );
};

export default ProfileLayout;
