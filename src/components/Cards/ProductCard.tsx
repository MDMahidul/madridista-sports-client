/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

type TProductCardProps = {
  product: TProduct;
};

const ProductCard = ({ product }: TProductCardProps) => {
  const [addToCart] = useAddToCartMutation();
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const {
    imageLink,
    off,
    quantity,
    name,
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

  const handleAddToCart = async () => {
    /* check if there is any user or product*/
    if (!token) {
      toast.error("Please sign in first !", { duration: 2000 });
      return;
    } else if (!product) {
      return;
    }
    try {
      const { _id, quantity: pQuantity } = product;
      // check quantity
      if (quantity > pQuantity) {
        toast.error("Not enough product available !", { duration: 2000 });
        return;
      }
      const cartData = {
        items: [{ product: _id, quantity: 1 }],
      };
      await addToCart({
        token: token,
        items: cartData.items,
      }).unwrap();
      toast.success("Product added to cart successfully.", {
        duration: 2000,
      });
    } catch (error) {
      toast.error((error as any)?.data?.message, { duration: 2000 });
    }
  };
  const prevPrice = price + Math.round(price * (off / 100));

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg relative hover:shadow-lg">
      <div className="relative overflow-hidden rounded-t-lg">
        <Link to={`/product/${_id}`}>
          <img
            className="rounded-t-lg product_card_img"
            src={imageLink}
            alt="product image"
          />
          {off > 0 ? (
            <div className="absolute top-4 left-4 bg-tertiary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {off}% OFF
            </div>
          ) : (
            ""
          )}
          <div
            className={`absolute bottom-4 right-4 bg-gray-50 ${
              quantity > 0 ? "text-green-500" : "text-red-500"
            } text-xs font-semibold px-3 py-1 rounded-full shadow-md`}
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
        <div className="px-5 pb-5 text-center">
          <div className="flex items-center justify-center my-2.5 pt-4">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Rating
                style={{ maxWidth: 90 }}
                value={Math.round(ratings)}
                readOnly
              />
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
              {ratings}
            </span>
          </div>
          <h5 className="text-lg md:text-xl font-semibold tracking-tight text-primary my-1">
            {name}
          </h5>

          <div className="flex items-center justify-center">
            <span className="text-lg md:text-lg font-bold text-tertiary">
              ${price}{" "}
              {off ? (
                <span className="text-gray-400 font-medium text-sm md:text-base line-through ms-2">
                  ${prevPrice}
                </span>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      </Link>
      <div className="px-8 sm:px-16 pb-4">
        <button
          onClick={handleAddToCart}
          className="text-center border border-primary px-3 py-1.5 w-full hover:bg-primary transform transition-all duration-200 hover:text-white text-sm sm:text-base font-semibold rounded-full text-primary hover:shadow-xl"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
