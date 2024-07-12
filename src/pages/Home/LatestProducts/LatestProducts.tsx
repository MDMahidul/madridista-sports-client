import ProductCard from "@/components/Cards/ProductCard";
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";

const LatestProducts = () => {
  return (
    <div>
      <Container>
        <SectionHeader heading={"The Latest Drop"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 md:gap-y-10 ">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
    </div>
  );
};

export default LatestProducts;
