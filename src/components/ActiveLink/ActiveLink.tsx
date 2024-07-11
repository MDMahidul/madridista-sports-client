import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type TNavLinkProps={
  to:string,
  children:ReactNode
}

const ActiveLink = ({ to, children }: TNavLinkProps) => {
  return (
    <div>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "text-base block bg-primary text-white rounded px-2 md:px-0  md:py-0 md:rounded-none md:pb-1  md:text-gray-700 md:dark:text-white  md:border-b-2 md:bg-transparent border-secondary "
            : "nav-item"
        }
      >
        {children}
      </NavLink>
    </div>
  );
};

export default ActiveLink;
