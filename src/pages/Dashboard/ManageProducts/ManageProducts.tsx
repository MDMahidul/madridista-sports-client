/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SlideInFromLeft from "@/components/Animations/SlideInFromLeft";
import SlideInFromRight from "@/components/Animations/SlideInFromRight";
import Container from "@/components/Container/Container";
import Loader from "@/components/Loader/Loader";
import AddProductModal from "@/components/Modals/AddProductModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import UpdateProductModal from "@/components/Modals/UpdateProductModal";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/products/products.api";
import { TQueryParams } from "@/types/global";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LoadingError from "../../Error/LoadingError";

const ManageProducts = () => {
  const [deleteProduct] = useDeleteProductMutation();
  const [params] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetAllProductsQuery(
    [{ name: "page", value: page }, ...params],
    {
      pollingInterval: 30000,
    }
  );

  if (isLoading) {
    return <Loader height="h-[80vh]" />;
  }

  if (isError || !data) {
    <LoadingError />;
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const { data: products } = data;
  console.log(data.meta);
  return (
    <div className="">
      <Helmet>
        <title>Manage Products</title>
      </Helmet>
      <Container>
        <div className="my-5 flex justify-between items-center border-b border-secondary pb-2">
          <SlideInFromLeft>
            <p className="font-semibold text-xl text-tertiary">
              <span className="text-primary">Total Products:</span>{" "}
              {data.meta.total}
            </p>
          </SlideInFromLeft>
          <SlideInFromRight>
            <AddProductModal />
          </SlideInFromRight>
        </div>
        <div>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <FadeInUpAnimation>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2">
                  <tr>
                    <th scope="col" className="p-4">
                      SL
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Ratings
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any, index: number) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={product._id}
                    >
                      <td className="w-4 p-4 font-semibold">
                        {(page - 1) * data.meta.limit + index + 1}
                      </td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-14 h-14 rounded-md"
                          src={product.imageLink}
                          alt="Jese image"
                        />
                        <div className="ps-3">
                          <Link
                            to={`/product/${product._id}`}
                            className="text-base font-semibold"
                          >
                            {product.name}
                          </Link>
                          <div className="font-normal text-gray-500 capitalize">
                            {product.brand}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4 text-center capitalize">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {product.price}$
                      </td>
                      <td className="px-6 py-4 text-center">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {product.ratings}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-4 justify-center items-center">
                          <UpdateProductModal product={product} />
                          <DeleteModal
                            onDelete={() => handleDeleteProduct(product._id)}
                            entityName="product"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FadeInUpAnimation>
          </div>
        </div>
        <FadeInUpAnimation>
          <div className="my-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(page - 1)}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: data.meta.totalPage }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                      isActive={page === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(page + 1)}
                    className={
                      page === data.meta.totalPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </FadeInUpAnimation>
      </Container>
    </div>
  );
};

export default ManageProducts;
