import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import ActiveLink from "../ActiveLink/ActiveLink";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItemCount } from "@/redux/features/cart/cartSlice";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart  } from "react-icons/fa";
import { Tooltip } from "flowbite-react";

const NavbarItems = () => {
  const cartItemCount = useAppSelector(selectCartItemCount);

  const [navbarHeight, setNavbarHeight] = useState("py-5");
  /* control nabar bg */
  useEffect(() => {
    const handleScroll = () => {
      setNavbarHeight(window.pageYOffset > 120 ? "py-3" : "py-5");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Navbar
      className={`bg-white border-gray-200 dark:bg-gray-500 shadow-md fixed w-full z-20 top-0 start-0 transition-all ease-out duration-200 ${navbarHeight} -px-20`}
    >
      <Navbar.Brand>
        <Link to="/">
          <div className="flex justify-center items-center gap-x-2">
            <img
              src={logo}
              className="w-10 md:w-[41px]"
              alt="madridita sports"
            />
            <p className="md:text-[23px] font-bold text-primary hidden sm:block">
              Madridista Sports
            </p>
          </div>
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2 ">
        <div className="flex items-center md:gap-7 space-x-4 md:space-x-0 rtl:space-x-reverse mr-5">
          <Tooltip content="Wishlist" animation="duration-500" style="light">
            <Link to="/wishlist">
              <FaRegHeart className="text-2xl sm:text-[25px] text-primary" />
            </Link>
          </Tooltip>
          <Tooltip content="Cart" animation="duration-500" style="light">
            <Link to="/cart" className="relative ">
              <HiOutlineShoppingBag className="text-2xl sm:text-3xl text-primary" />

              <span className="absolute -top-1 -right-2 bg-tertiary rounded-full font-medium text-[10px] px-1.5 py-[1px] text-white">
                {cartItemCount}
              </span>
            </Link>
          </Tooltip>
          <Tooltip content="User" animation="duration-500" style="light">
            <DropdownMenu />
          </Tooltip>
        </div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <ActiveLink to="/">Home</ActiveLink>
        <ActiveLink to="/all-products">All Products</ActiveLink>
        <ActiveLink to="/manage-products">Manage Products</ActiveLink>
        <ActiveLink to="/about-us">About Us</ActiveLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarItems;
