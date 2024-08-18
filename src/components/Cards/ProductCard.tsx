import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { TProduct } from "@/types/types";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addWishList,
  removeWishList,
  SelectedWishList,
} from "@/redux/features/wishList/wishListslice";

type TProductCardProps = {
  product: TProduct;
};

const ProductCard = ({ product }: TProductCardProps) => {
  const dispatch = useAppDispatch();
  const {
    imageLink,
    off,
    quantity,
    name,
    brand,
    category,
    ratings,
    price,
    _id,
  } = product;

  const wishListItems = useAppSelector(SelectedWishList);
  const isInWishList = wishListItems.some((item) => item._id === _id);

  const handleWishList = () => {
    try {
      if (isInWishList) {
        dispatch(removeWishList({ productId: _id! }));
        toast.success("Product removed from wishlist!", { duration: 2000 });
      } else {
        dispatch(
          addWishList({
            product: {
              _id,
              name,
              price,
              imageLink,
              quantity,
            },
          })
        );
        toast.success("Product added to wishlist !", { duration: 2000 });
      }
    } catch (error) {
      toast.error("Something went wrong !", { duration: 2000 });
    }
  };
  const prevPrice = price + Math.round(price * (off / 100));

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 relative hover:shadow-lg">
      <div className="relative overflow-hidden rounded-t-lg">
        <Link to={`/product/${_id}`}>
          <img
            className="rounded-t-lg product_card_img"
            src={imageLink}
            alt="product image"
          />
          {off > 0 ? (
            <div className="absolute top-4 left-4 bg-tertiary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {off}% OFF
            </div>
          ) : (
            ""
          )}
          <div
            className={`absolute bottom-4 right-4 bg-gray-50 ${
              quantity > 0 ? "text-green-500" : "text-red-500"
            } text-xs font-bold px-3 py-1 rounded-full shadow-md`}
          >
            {quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
          </div>
        </Link>
        <div
          className={`absolute top-3.5 right-4   hover:text-tertiary transition-all duration-200
             text-2xl ${isInWishList ? "text-tertiary" : "text-gray-400"} `}
        >
          <button onClick={() => handleWishList()}>
            {isInWishList ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
      <Link to={`/product/${_id}`}>
        <div className="px-5 pb-5">
          <h5 className="mt-4 text-lg md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          <p className="text-sm md:text-base font-medium text-gray-600 capitalize">
            Brand: {brand}
          </p>
         {/*  <p className="text-sm md:text-base font-medium text-gray-600 capitalize">
            Category: {category}
          </p> */}
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Rating
                style={{ maxWidth: 100 }}
                value={Math.round(ratings)}
                readOnly
              />
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {ratings}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              ${price}{" "}
              {off ? (
                <span className="text-gray-400 font-medium text-base md:text-lg line-through ms-2">
                  ${prevPrice}
                </span>
              ) : (
                ""
              )}
            </span>
            <a href="#" className="primary-button">
              View Details
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
