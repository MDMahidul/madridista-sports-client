import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import { Helmet } from "react-helmet-async";

const Blogs = () => {
  return (
    <div className="pt-10 md:pt-16">
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <Container>
        <SectionHeader heading="Blogs" />
      </Container>
    </div>
  );
};

export default Blogs;
