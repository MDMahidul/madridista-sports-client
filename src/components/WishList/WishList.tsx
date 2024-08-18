import { useGetWishlistQuery } from "@/redux/features/wishList/wishList.api";
import { SelectedWishList } from "@/redux/features/wishList/wishListslice";
import { useAppSelector } from "@/redux/hooks";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const WishList = () => {
  const wishListItems = useAppSelector(SelectedWishList);
const { data:wishlists } = useGetWishlistQuery("");

  return (
    <Link to="/wishlist">
      <div className="fixed top-1/2 right-2  text-white  transition-all hover:scale-95 z-50 text-center hidden sm:block">
        <div className="relative z-10">
          <div className="bg-tertiary rounded-t py-2 px-2 font-semibold text-xs">
            {wishListItems.length}
          </div>
          <div className="bg-[#351805] font-semibold text-xs rounded-b px-1.5 py-2 flex justify-center items-center gap-1">
            <FaHeart className="text-white text-[10px]" /> Wishlist
          </div>
        </div>
        <div className="bg-secondary w-[68px] h-[63px] rounded absolute top-[-3px] right-[-3px]">
          {" "}
        </div>
      </div>
    </Link>
  );
};

export default WishList;
