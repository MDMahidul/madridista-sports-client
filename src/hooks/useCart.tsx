import { useGetCartQuery } from "@/redux/features/cart/cart.api";
import useUserProfile from "./useUserProfile";
import LoadingError from "@/pages/Error/LoadingError";

const useCart = () => {
const token =useUserProfile();
    
const { data:cartData, isError, isLoading } = useGetCartQuery(
  { token: token },
  { skip: !token }
);
if (isLoading) {
  return null;
}
if (isError || !cartData) {
  <LoadingError />;
}
    return {cartData};
};

export default useCart;

