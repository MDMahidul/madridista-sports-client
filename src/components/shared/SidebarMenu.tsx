import { useState } from "react";
import logo from "@/assets/msports.webp";
import { FiMenu } from "react-icons/fi";
import { FaUsers, FaHome, FaSignOutAlt } from "react-icons/fa";
import { HiMiniRectangleStack } from "react-icons/hi2";
import { MdShoppingCart } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* for small dispaly */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer px-4  py-2 font-bold">
            <img className="w-12" src={logo} alt="" />
          </div>
        </div>

        <button
          onClick={handleToggleSidebar}
          className="p-4 focus:outline-none  transform transition-all duration-300 ease-in-out"
        >
          {isOpen ? (
            <FiMenu className="h-6 w-6" />
          ) : (
            <RxCross2 className="h-6 w-6" />
          )}
        </button>
      </div>
      {/* main sidebar */}
      <div
        className={` z-10 md:fixed flex flex-col  overflow-x-hidden bg-gray-100 dark:bg-gray-600 w-[300px] space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isOpen && "-translate-x-full"
        } md:translate-x-0 transition-all duration-300 ease-in-out`}
      >
        <div>
          <div className="flex justify-center items-center gap-x-2">
            <img src={logo} className="w-8 md:w-[41px]" alt="Flowbite Logo" />
            <p className="md:text-[23px] font-bold text-primary">
              Madridista Sports
            </p>
          </div>
         
        </div>
        <div>
          <nav>
            <NavLink
              to="addproduct"
              className={({ isActive }) =>
                `sidebar ${
                  isActive ? "sidebar-active" : "text-gray-600 dark:text-white"
                }`
              }
            >
              <MdShoppingCart className="w-5 h-5" />
              <span className="mx-4 font-medium">Add Product</span>
            </NavLink>
            <NavLink
              to="listproduct"
              className={({ isActive }) =>
                `sidebar ${
                  isActive ? "sidebar-active" : "text-gray-600 dark:text-white"
                }`
              }
            >
              <HiMiniRectangleStack className="w-5 h-5" />
              <span className="mx-4 font-medium">Product List</span>
            </NavLink>
            <NavLink
              to="listuser"
              className={({ isActive }) =>
                `sidebar ${
                  isActive ? "sidebar-active" : "text-gray-600 dark:text-white"
                }`
              }
            >
              <FaUsers className="w-5 h-5" />
              <span className="mx-4 font-medium">Users List</span>
            </NavLink>
          </nav>
        </div>
        <div>
          <hr />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `sidebar ${
                isActive ? "sidebar-active" : "text-gray-600 dark:text-white"
              }`
            }
          >
            <FaHome className="w-5 h-5" />

            <span className="mx-4 font-medium">Home Page</span>
          </NavLink>
          <button
            /* onClick={() => logOut()} */
            className="w-full sidebar text-gray-600 dark:text-white"
          >
            <FaSignOutAlt className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
