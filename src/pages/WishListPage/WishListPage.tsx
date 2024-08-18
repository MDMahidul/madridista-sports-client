import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import {
  clearWishList,
  removeWishList,
  SelectedWishList,
} from "@/redux/features/wishList/wishListslice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Trash2Icon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

const WishListPage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const wishListItems = useAppSelector(SelectedWishList);
  const [addToCart] = useAddToCartMutation();
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
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add items to cart!", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="pt-10 md:pt-16">
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <Container>
        <SectionHeader heading="My Wishlist" />
        <div>
          {wishListItems.length === 0 ? (
            <FadeInUpAnimation>
              <div className="text-center ">
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
                      <TableRow>
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

export default WishListPage;
