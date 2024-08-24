/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/Loader/Loader";
import useUserProfile from "@/hooks/useUserProfile";
import { useGetUserOrderQuery } from "@/redux/features/order/orderapi";
import LoadingError from "../Error/LoadingError";
import { Helmet } from "react-helmet-async";
import Container from "@/components/Container/Container";
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";

const MyOrders = () => {
  const { token } = useUserProfile();
  const {
    data: orderData,
    isError,
    isLoading,
  } = useGetUserOrderQuery({ token });

  if (isLoading) {
    return <Loader height="h-[80vh]" />;
  }
  if (isError || !orderData) {
    return <LoadingError />;
  }

  // Function to format the date
/*   const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }; */

  return (
    <div className="mt-10 mb-20  sm:mb-40">
      <Helmet>
        <title>My Orders</title>
      </Helmet>
      <Container>
        {orderData?.data?.lengTableHead === 0 || !orderData ? (
          <FadeInUpAnimation>
            <div className="text-center flex justify-center items-center flex-col ">
              <p className="text-lg text-gray-500 font-semibold mb-10">
                No order placed yet.
              </p>
              <Link to="/all-products" className="primary-button">
                Shop Now
              </Link>
            </div>
          </FadeInUpAnimation>
        ) : (
          <div>
            {orderData.data.map((order: any, orderIndex: number) => (
              <FadeInUpAnimation key={orderIndex}>
                <div className="mb-10 ">
                  <div className="font-medium sm:font-semibold mb-4 flex justify-between flex-wrap text-sm sm:text-base">
                    <div className="text-primary">
                      <p>
                        {orderIndex + 1}. Order ID: {order._id}
                        <span className="text-xs ms-1 text-tertiary">({formatDate(order.createdAt)})</span>
                      </p>
                    </div>
                    <p className="text-tertiary">
                      Total Cost: ${order.totalPrice}
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>SL</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.items.map((item: any, itemIndex: number) => (
                          <TableRow key={itemIndex}>
                            <TableCell>{itemIndex + 1}.</TableCell>
                            <TableCell className="sm:flex items-center gap-1">
                              <img
                                className="w-10"
                                src={item.product.imageLink}
                                alt=""
                              />
                              <p>{item.product.name}</p>
                            </TableCell>
                            <TableCell>${item.product.price}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </FadeInUpAnimation>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyOrders;
