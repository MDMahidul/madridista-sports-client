import Banner from '../Banner/Banner';
import LatestProducts from '../LatestProducts/LatestProducts';
import ContactUs from '../ContactUs/ContactUs';
import Partners from '../Partners/Partners';
import Categories from '../Categories/Categories';
import Reviews from '../Reviews/Reviews';
import { Helmet } from 'react-helmet-async';
import TopRatedProducts from '../TopRatedProducts/TopRatedProducts';

const HomePage = () => {
    return (
      <div className="pt-[75px] md:pt-[84px]">
        <Helmet>
          <title>Madridista Sports</title>
        </Helmet>
        <Banner />
        <LatestProducts />
        <Categories />
        <TopRatedProducts/>
        <ContactUs />
        <Reviews />
        <Partners />
      </div>
    );
};

export default HomePage;