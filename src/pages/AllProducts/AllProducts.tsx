import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

type TRouteParams = {
  category?: string;
};

type TErrorResponse = {
  status: number;
  message: string;
};

const AllProducts = () => {
  const { register, handleSubmit, reset } = useForm();
  const { category } = useParams<TRouteParams>();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [queryOptions, setQueryOptions] = useState<{
    category?: string;
    name?: string;
    sort?: string;
  }>({});

  // reload the page based on the category data
  useEffect(() => {
    if (category) {
      setSelectedCategory(category.toLowerCase());
      setQueryOptions({ category: category.toLowerCase() });
    } else {
      setSelectedCategory(undefined);
      setQueryOptions({});
    }
  }, [category]);

  // set the name value
  /* const handleNameChange = (e: FormEvent) => {
    setName(e.target.value.toLowerCase());
  }; */

  // handle search function by name
  const handleSearchSubmit = (data: FieldValues) => {
    setQueryOptions((prevOptions) => ({
      ...prevOptions,
      name: data.name || undefined,
    }));
    // Update URL based on search params
    navigate(
      `/all-products${selectedCategory ? `/${selectedCategory}` : ""}${
        data.name ? `?name=${data.name}` : ""
      }`
    );
    setName(data.name);
  };

  // clare the input filed and refetch the page data
  const handleClearSearch = () => {
    setName("");
    setQueryOptions((prevOptions) => ({
      ...prevOptions,
      name: undefined,
    }));
    // Update URL to remove search params
    navigate(`/all-products${selectedCategory ? `/${selectedCategory}` : ""}`);
    reset();
  };

  // handle sort by price
  const handleSortByPrice = (sortType: string) => {
    setQueryOptions((prevOptions) => ({
      ...prevOptions,
      sort: sortType,
    }));
  };

  const { data, error, isLoading } = useGetAllProductsQuery(queryOptions, {
    pollingInterval: 30000,
  });

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

  const { data: products } = data;

  // get the sorted data
  const sortedProducts = [...products].sort((a: TProduct, b: TProduct) => {
    if (queryOptions.sort === "price") {
      return a.price - b.price;
    } else if (queryOptions.sort === "-price") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div className="pt-10 md:pt-16">
      <Helmet>
        <title>{category ? category : 'All Products'}</title>
      </Helmet>
      <SectionHeader
        heading={category ? `${category} Products` : "All Products"}
      />
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
                      <form onSubmit={handleSubmit(handleSearchSubmit)}>
                        <div className="relative">
                          <label className="text-lg font-semibold text-primary">
                            Search product by category
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
                        onChange={(e) => {
                          const selected = e.target.value;
                          setSelectedCategory(selected);
                          if (selected) {
                            setQueryOptions({ category: selected });
                            navigate(`/all-products/${selected}`);
                          } else {
                            setSelectedCategory(undefined);
                            setQueryOptions({});
                            navigate("/all-products");
                          }
                        }}
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
                        value={queryOptions.sort || ""}
                        onChange={(e) => handleSortByPrice(e.target.value)}
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
                value={queryOptions.sort || ""}
                onChange={(e) => handleSortByPrice(e.target.value)}
              >
                <option value="">Sort by price</option>
                <option value="price">Low to High</option>
                <option value="-price">High to Low</option>
              </select>
            </div>
          </SlideInFromRight>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 md:gap-y-10">
          {sortedProducts.map((product: TProduct, index: number) => (
            <FadeInUpAnimation custom={index} key={product._id}>
              <ProductCard product={product} />
            </FadeInUpAnimation>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllProducts;
