import Container from "@/components/Container/Container";
import Loader from "@/components/Loader/Loader";
import AddProductModal from "@/components/Modals/AddProductModal";
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const ManageProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery(undefined);
  if (isLoading) {
    return <Loader height={"h-[80vh]"} />;
  }

  if (isError || !data) {
    return (
      <Container>
        <div className="pt-12 md:pt-24">
          <p className="mt-20 py-40 text-center text-xl font-semibold text-primary">
            Something went wrong!
          </p>
        </div>
      </Container>
    );
  }

  const { data: products } = data;
  console.log(products);
  return (
    <div className="pt-12 md:pt-24 ">
      <Container>
        <div className="my-5 flex justify-between items-center">
          <p className="font-semibold text-xl text-secondary">
            <span className="text-primary">Total Products:</span>{" "}
            {products.length}
          </p>
          <AddProductModal />
        </div>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                    <td className="w-4 p-4 font-semibold">{index + 1}</td>
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
                        <div className="text-base font-semibold">
                          {product.name}
                        </div>
                        <div className="font-normal text-gray-500 capitalize">
                          {product.brand}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 text-center capitalize">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-center">{product.price}$</td>
                    <td className="px-6 py-4 text-center">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-center">{product.ratings}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-4 justify-center items-center">
                        <button>
                          <PencilSquareIcon className="size-6 hover:text-primary transition-all duration-200 hover:scale-110" />
                        </button>
                        <button>
                          <TrashIcon className="size-6 hover:text-primary transition-all duration-200 hover:scale-110" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ManageProducts;
