import { BsCart3 } from "react-icons/bs";
import { FaRegHeart, FaList, FaRegUserCircle } from "react-icons/fa";
import ActiveLink from "../ActiveLink/ActiveLink";

const UserNavMenu = () => {

  return (
    <div className="border-b border-gray-200 ">
      <ul className="flex flex-wrap justify-center items-center -mb-px text-sm font-medium text-center text-gray-500 ">
        <li className="sm:me-2">
          <ActiveLink to="/profile">
            <div className="text-sm flex justify-center items-center gap-x-1 py-1  sm:p-2 ">
              <FaRegUserCircle />
              Profile
            </div>
          </ActiveLink>
        </li>
        <li className="sm:me-2">
          <ActiveLink to="/profile/my-orders">
            <div className="text-sm flex justify-center items-center gap-x-1 py-1  sm:p-2">
              <FaList />
              My Orders
            </div>
          </ActiveLink>
        </li>

        <li className="sm:me-2">
          <ActiveLink to="/profile/my-cart">
            <div className="text-sm flex justify-center items-center gap-x-1 py-1  sm:p-2">
              <BsCart3 />
              My Cart
            </div>
          </ActiveLink>
        </li>
        <li className="sm:me-2">
          <ActiveLink to="/profile/my-wishlist">
            <div className="text-sm flex justify-center items-center gap-x-1 py-1  sm:p-2">
              <FaRegHeart />
              Wishlist
            </div>
          </ActiveLink>
        </li>
      </ul>
    </div>
  );
};

export default UserNavMenu;
