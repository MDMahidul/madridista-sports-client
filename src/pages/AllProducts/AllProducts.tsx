import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import ProductCard from "@/components/Cards/ProductCard";
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import Loader from "@/components/Loader/Loader";
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import { TProduct } from "@/types/types";

type RouteParams = {
  category?: string;
};

const AllProducts= () => {
  const { category } = useParams<RouteParams>();
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
      setSelectedCategory(undefined)
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
      `/all-products${selectedCategory ? `/${selectedCategory}` : ""}${
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
      navigate(`/all-products${selectedCategory ? `/${selectedCategory}` : ""}`);
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
    if (error.status === 404) {
      return (
        <Container>
          <div className="pt-12 md:pt-24">
            <p className="mt-20 py-40 text-center text-xl font-semibold text-primary">
              No products found for{" "}
              {selectedCategory ? `${selectedCategory} category` : "the selected criteria"}.
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
      <SectionHeader
        heading={category ? `${category} Products` : "All Products"}
      />
      <Container>
        <FadeInUpAnimation>
          <div className="flex flex-col md:flex-row justify-center items-center  md:justify-between">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col md:flex-row items-center gap-4 mb-5"
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
            <div className="mb-5">
              <select
                className="bg-gray-50 border border-secondary text-gray-500 rounded-lg block p-2.5 focus:outline-none focus:border-blue-600 focus:ring-blue-600 w-60"
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
            <div className="flex flex-col-reverse md:flex-row items-center mb-5 gap-1">
              <label className="mr-2 text-gray-700">Sort by Price:</label>
              <select
                className="bg-gray-50 border border-secondary text-gray-500 rounded-lg block p-2.5 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                value={queryOptions.sort || ""}
                onChange={(e) => handleSortByPrice(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price">Low to High</option>
                <option value="-price">High to Low</option>
              </select>
            </div>
          </div>
        </FadeInUpAnimation>
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
