/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdDashboard } from "react-icons/md";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
  FaRegBell,
  FaUserPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import MenuOptions from "./MenuOptions";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { resetOrderStatus } from "@/redux/features/order/order.slice";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    dispatch(resetOrderStatus());
  };
  return (
    <div className="flex items-center justify-center bg-white">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center rounded-md text-primary  transition-colors"
        >
          <span className="font-medium text-sm  md:mt-[1px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 md:size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </span>
          <motion.span variants={iconVariants}></motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white  absolute top-[150%] left-[60%] w-36 overflow-hidden shadow-xl"
        >
          {!user && (
            <>
              <Link to="/signin">
                <MenuOptions
                  setOpen={setOpen}
                  Icon={FaSignInAlt}
                  text="Sign In"
                />
              </Link>
              <Link to="/signup">
                <MenuOptions
                  setOpen={setOpen}
                  Icon={FaUserPlus}
                  text="Sign Up"
                />
              </Link>
            </>
          )}
          {user?.role === "superAdmin" || user?.role === "admin" ? (
            <Link to="/dashboard">
              <MenuOptions
                setOpen={setOpen}
                Icon={MdDashboard}
                text="Dashboard"
              />
            </Link>
          ) : null}
          {user && (
            <>
              <Link to="/profile">
                <MenuOptions
                  setOpen={setOpen}
                  Icon={FaUserAlt}
                  text="Profile"
                />
              </Link>

              <MenuOptions
                setOpen={setOpen}
                Icon={FaRegBell}
                text="Notification"
              />
              <button onClick={handleLogout}>
                <MenuOptions
                  setOpen={setOpen}
                  Icon={FaSignOutAlt}
                  text="Sign Out"
                />
              </button>
            </>
          )}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default DropdownMenu;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};
