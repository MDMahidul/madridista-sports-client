import { useState, ChangeEvent } from "react";
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import ProductCard from "@/components/Cards/ProductCard";
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import Loader from "@/components/Loader/Loader";
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import { TProduct } from "@/types/types";
import { FieldValues, useForm } from "react-hook-form";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SlideInFromLeft from "@/components/Animations/SlideInFromLeft";
import SlideInFromRight from "@/components/Animations/SlideInFromRight";
import { Helmet } from "react-helmet-async";
import { TQueryParams } from "@/types/global";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TErrorResponse = {
  status: number;
  message: string;
};

const AllProducts = () => {
  const { register, handleSubmit, reset } = useForm();
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [name, setName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useGetAllProductsQuery(
    [{ name: "page", value: page }, ...params],
    {
      pollingInterval: 30000,
    }
  );

  if (isLoading) {
    return <Loader height="h-[80vh]" />;
  }

  if (error) {
    const errorData = error as TErrorResponse;
    if (errorData.status === 404) {
      return (
        <Container>
          <div className="pt-12 md:pt-24">
            <p className="mt-20 py-40 text-center text-xl font-semibold text-primary">
              No products found for{" "}
              {selectedCategory
                ? `${selectedCategory} category`
                : "the selected criteria"}
              .
            </p>
          </div>
        </Container>
      );
    } else {
      return (
        <Container>
          <div className="pt-12 md:pt-24">
            <p className="mt-20 py-40 text-center text-xl font-semibold text-primary">
              {errorData.message || "Something went wrong!"}
            </p>
          </div>
        </Container>
      );
    }
  }

  /* handle pagination */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  /* handle search by category */
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedCategory(selected);

    const updatedParams = selected
      ? [{ name: "category", value: selected }]
      : [];

    setParams(updatedParams);
    setPage(1);
  };

  /* handle search function by name */
  const handleSearchByName = (data: FieldValues) => {
    const searchTerm = data.name;
    setName(searchTerm);

    const updatedParams = [
      { name: "category", value: selectedCategory },
      { name: "searchTerm", value: searchTerm },
      { name: "sort", value: sortOrder },
    ];

    setParams(updatedParams.filter((param) => param.value));
    setPage(1);
  };

  /* handle sort by price */
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
    const updatedParams = [
      { name: "category", value: selectedCategory },
      { name: "searchTerm", value: name },
      { name: "sort", value: selectedSortOrder },
    ];

    setParams(updatedParams.filter((param) => param.value));
    setPage(1);
  };

  /* clare the input filed and refetch the page data */
  const handleClearSearch = () => {
    setName("");
    setPage(1);
    setParams([]);
    reset();
  };

  const { data: products } = data;

  return (
    <div className="pt-10 md:pt-16">
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <SectionHeader heading={"All Products"} />
      <Container>
        <div className="flex  items-center  justify-between">
          <SlideInFromLeft>
            <div className="grid grid-cols-2 gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <button className=" flex justify-center items-center gap-2 font-semibold">
                    <SlidersHorizontal className="size-5 text-tertiary" />{" "}
                    Filter
                  </button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-primary">
                      Search Product
                    </SheetTitle>
                  </SheetHeader>
                  <SheetDescription>
                    Search your desired product by name or by categories
                  </SheetDescription>
                  <div className=" flex flex-col gap-y-10 mt-10">
                    <div>
                      <form onSubmit={handleSubmit(handleSearchByName)}>
                        <div className="relative">
                          <label className="text-lg font-semibold text-primary">
                            Search product by name
                          </label>
                          <input
                            className="seceondary-input-field mt-2"
                            type="text"
                            placeholder="Product name"
                            {...register("name", { required: true })}
                          />
                          {name && (
                            <button
                              type="button"
                              onClick={handleClearSearch}
                              className="secondary-button absolute right-7 top-[45px] text-tertiary"
                            >
                              <X className="size-4" />
                            </button>
                          )}
                        </div>
                        <button type="submit" className="primary-button mt-3">
                          Search
                        </button>
                      </form>
                    </div>
                    <div>
                      <label className="text-lg font-semibold text-primary">
                        Search product by category
                      </label>
                      <select
                        className="seceondary-input-field mt-2"
                        value={selectedCategory || ""}
                        onChange={handleCategoryChange}
                      >
                        <option value="">Select Category</option>
                        <option value="football">Football</option>
                        <option value="basketball">Basketball</option>
                        <option value="cricket">Cricket</option>
                        <option value="tennis">Tennis</option>
                        <option value="golf">Golf</option>
                        <option value="baseball">Baseball</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-lg font-semibold text-primary">
                        Sort product by price
                      </label>
                      <select
                        className="seceondary-input-field mt-2"
                        value={sortOrder || ""}
                        onChange={handleSortChange}
                      >
                        <option value="">Default</option>
                        <option value="price">Low to High</option>
                        <option value="-price">High to Low</option>
                      </select>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </SlideInFromLeft>
          <SlideInFromRight>
            <div className="flex flex-col-reverse md:flex-row items-center mb-5 gap-1">
              {/* <label className="mr-2 text-gray-700">Sort by Price:</label> */}
              <select
                className="border-0 border-b border-b-secondary focus:ring-0 font-semibold text-sm"
                value={sortOrder || ""}
                onChange={handleSortChange}
              >
                <option value="">Sort by price</option>
                <option value="price">Low to High</option>
                <option value="-price">High to Low</option>
              </select>
            </div>
          </SlideInFromRight>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 md:gap-y-10">
          {products.map((product: TProduct, index: number) => (
            <FadeInUpAnimation custom={index} key={product._id}>
              <ProductCard product={product} />
            </FadeInUpAnimation>
          ))}
        </div>
      </Container>
      <FadeInUpAnimation>
        <div className="my-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(page - 1)}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
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
    </div>
  );
};

export default AllProducts;
