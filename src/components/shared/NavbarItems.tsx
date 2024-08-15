import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import ActiveLink from "../ActiveLink/ActiveLink";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItemCount } from "@/redux/features/cart/cartSlice";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

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
      <Navbar.Brand >
        <Link to="/">
          <div className="flex justify-center items-center gap-x-2">
            <img src={logo} className="w-8 md:w-[41px]" alt="madridita sports" />
            <p className="md:text-[23px] font-bold text-primary hidden sm:block">
              Madridista Sports
            </p>
          </div>
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2 ">
        <div className="flex md:gap-7 space-x-4 md:space-x-0 rtl:space-x-reverse mr-5">
          <Link to="/cart" className="relative mt-2 md:mt-[1px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 md:size-7 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <span className="absolute -top-1.5 -right-2 bg-tertiary rounded-full font-medium text-[10px] px-1.5 py-[1px] text-white">
              {cartItemCount}
            </span>
          </Link>
          <DropdownMenu/>
        </div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <ActiveLink to="/">
          Home
        </ActiveLink>
        <ActiveLink to="/all-products">All Products</ActiveLink>
        <ActiveLink to="/manage-products">Manage Products</ActiveLink>
        <ActiveLink to="/about-us">About Us</ActiveLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarItems;
