import { ReactNode } from "react";
import { NavLink, useMatch } from "react-router-dom";

type TNavLinkProps={
  to:string,
  children:ReactNode
}

const ActiveLink = ({ to, children }: TNavLinkProps) => {
  const match = useMatch({path:to,end:true})
  return (
    <div>
      <NavLink 
        to={to}
        className={({ isActive }) =>
         isActive && match
            ? "text-base block bg-primary text-white rounded px-2 md:px-0  md:py-0 md:rounded-none md:pb-1  md:text-primary md:dark:text-white  md:border-b-2 md:bg-transparent border-secondary "
            : "nav-item"
        }
      >
        {children}
      </NavLink>
    </div>
  );
};

export default ActiveLink;
