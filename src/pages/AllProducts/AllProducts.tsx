import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import ProductCard from "@/components/Cards/ProductCard";
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import Loader from "@/components/Loader/Loader";
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import { TProduct } from "@/types/types";
import { X } from "lucide-react";

type RouteParams = {
  category?: string;
};

const AllProducts= () => {
  const { category } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [queryOptions, setQueryOptions] = useState<{
    category?: string;
    name?: string;
  }>({});

  // reload the page based on the category data
  useEffect(() => {
    if (category) {
      setQueryOptions({ category: category.toLowerCase() });
    } else {
      setQueryOptions({});
    }
  }, [category]);


  // set the name value
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.toLowerCase());
  };

  // handle search function by name
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryOptions((prevOptions) => ({
      ...prevOptions,
      name: name || undefined,
    }));
    // Update URL based on search params
    navigate(
      `/all-products${category ? `/${category}` : ""}${
        name ? `?name=${name}` : ""
      }`
    );
  };

  // clare the input filed and refetch the page data
    const handleClearSearch = () => {
      setName("");
      setQueryOptions((prevOptions) => ({
        ...prevOptions,
        name: undefined,
      }));
      // Update URL to remove search params
      navigate(`/all-products${category ? `/${category}` : ""}`);
    };

  const { data, error, isLoading } = useGetAllProductsQuery(queryOptions, {
    pollingInterval: 30000,
  });

  if (isLoading) {
    return <Loader height="h-[80vh]" />;
  }

  if (error) {
    if (error.status === 404) {
      return (
        <Container>
          <div className="pt-12 md:pt-24">
            <p className="mt-20 py-40 text-center text-xl font-semibold text-primary">
              No products found for{" "}
              {category ? `${category} category` : "the selected criteria"}.
            </p>
          </div>
        </Container>
      );
    } else {
      return (
        <Container>
          <div className="pt-12 md:pt-24">
            <p className="mt-20 py-40 text-center text-xl font-semibold text-primary">
              {error.message || "Something went wrong!"}
            </p>
          </div>
        </Container>
      );
    }
  }

  const { data: products } = data;

  return (
    <div className={`${category ? "pt-10 md:pt-16" : "pt-28 md:pt-36"}`}>
      {category && <SectionHeader heading={`${category} Products`} />}
      <Container>
        <div>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-4 mb-5"
          >
            <div className="relative">
              <input
                className="bg-gray-50 border border-secondary text-gray-900 rounded-lg block p-2.5 focus:outline-none focus:border-blue-600 focus:ring-blue-600 w-60 "
                type="text"
                placeholder="Search by name"
                value={name}
                onChange={handleNameChange}
              />
              {name && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="secondary-button absolute right-5 top-3.5 text-tertiary"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <button type="submit" className="primary-button">
              Search
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 md:gap-y-10">
          {products.map((product: TProduct, index: number) => (
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
