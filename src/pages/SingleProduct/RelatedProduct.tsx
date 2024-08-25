/* eslint-disable @typescript-eslint/no-unused-vars */
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import ProductCard from "@/components/Cards/ProductCard";
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import { TQueryParams } from "@/types/global";
import { TProduct } from "@/types/types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadingError from "../Error/LoadingError";
import Loader from "@/components/Loader/Loader";

type RelatedProductProps = {
  category: string;
  limit?: number;
};

const RelatedProduct: React.FC<RelatedProductProps> = ({ category, limit }) => {
  const [params] = useState<TQueryParams[]>([]);
  const { data, isLoading, isError } = useGetAllProductsQuery(
    [
      { name: "category", value: category },
      { name: "limit", value: limit },
      ...params,
    ],
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

  const { data: products } = data;
  return (
    <div className="md-5 md:mb-10">
      <Container>
        <SectionHeader heading={"Related Products"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 md:gap-y-10 ">
          {products.map((product: TProduct, index: number) => (
            <FadeInUpAnimation custom={index} key={product._id}>
              <ProductCard product={product} />
            </FadeInUpAnimation>
          ))}
        </div>

        <FadeInUpAnimation>
          <div className="text-center">
            <Link to={"/all-products"}>
              <button className="seceondary-button my-10">Explore More</button>
            </Link>
          </div>
        </FadeInUpAnimation>
      </Container>
    </div>
  );
};

export default RelatedProduct;
