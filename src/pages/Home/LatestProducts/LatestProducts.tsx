import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import ProductCard from "@/components/Cards/ProductCard";
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import Loader from "@/components/Loader/Loader";
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import { TProduct } from "@/types/types";

const LatestProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery(undefined, {
    pollingInterval: 30000,
  });
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

  return (
    <div className="md-5 md:mb-10">
      <Container>
        <SectionHeader heading={"The Latest Drop"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 md:gap-y-10 ">
          {products.map((product:TProduct,index:number) => (
            <FadeInUpAnimation custom={index} key={product._id}>
              <ProductCard product={product}/>
            </FadeInUpAnimation>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default LatestProducts;
