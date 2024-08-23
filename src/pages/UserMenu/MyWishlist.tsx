/* eslint-disable @typescript-eslint/no-explicit-any */
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import Container from "@/components/Container/Container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2Icon } from "lucide-react";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import {
  clearWishList,
  removeWishList,
  SelectedWishList,
} from "@/redux/features/wishList/wishListslice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import DeleteModal from "@/components/Modals/DeleteModal";
import useUserProfile from "@/hooks/useUserProfile";

const MyWishlist = () => {
  const dispatch = useAppDispatch();
  const wishListItems = useAppSelector(SelectedWishList);
  const [addToCart] = useAddToCartMutation();
  const { token } = useUserProfile();
  const handleRemoveWishListItem = (id: string) => {
    try {
      dispatch(removeWishList({ productId: id }));
      toast.success("Product removed from wishlist!", { duration: 2000 });
    } catch (error) {
      toast.error("Something went wrong !", { duration: 2000 });
    }
  };

  const handleClearWishListItem = async () => {
    await dispatch(clearWishList());
  };

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please sing in first!", {
        duration: 2000,
      });

      return;
    }
    try {
      const items = wishListItems.map((item) => ({
        product: item._id,
        quantity: 1,
      }));

      await addToCart({ items, token }).unwrap();
      await dispatch(clearWishList());
      toast.success("All items added to cart successfully!", {
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add items to cart!", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="mt-10 mb-20  sm:mb-40">
      <Helmet>
        <title>My Wishlist</title>
      </Helmet>
      <Container>
        <div>
          {wishListItems.length === 0 ? (
            <FadeInUpAnimation>
              <div className="text-center flex justify-center items-center flex-col h-[50vh]">
                <p className="text-lg  text-gray-500 font-semibold mb-10">
                  Your wishlist is empty.
                </p>
                <Link to="/all-products" className="primary-button">
                  Shop Now
                </Link>
              </div>
            </FadeInUpAnimation>
          ) : (
            <FadeInUpAnimation>
              <div className="w-full sm:max-w-4xl mx-auto">
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Products</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wishListItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Link to={`/product/${item._id}`}>
                            <div className="py-2  flex items-center gap-3">
                              <img
                                className="w-10 sm:w-14 md:w-20"
                                src={item.imageLink}
                                alt={item.name}
                              />
                              <div>
                                <p className="sm:font-medium">{item.name}</p>
                                <p className="text-gray-500">
                                  Price: ${item.price}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>
                          {item.quantity > 0 ? "in stock" : "out of stock"}
                        </TableCell>
                        <TableCell>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveWishListItem(item._id!)}
                          >
                            <Trash2Icon />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="text-right mt-10 flex  justify-between sm:justify-end gap-x-5 sm:gap-x-10">
                  <Link className="primary-button" to="/all-products">
                    Continue
                  </Link>
                  <button
                    onClick={handleAddToCart}
                    className="seceondary-button"
                  >
                    Add To Cart
                  </button>
                  <DeleteModal
                    onDelete={() => handleClearWishListItem()}
                    entityName="wishlist"
                    buttonName="Clear List"
                  />
                </div>
              </div>
            </FadeInUpAnimation>
          )}
        </div>
      </Container>
    </div>
  );
};

export default MyWishlist;
