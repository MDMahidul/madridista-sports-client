import Banner from '../Banner/Banner';
import LatestProducts from '../LatestProducts/LatestProducts';
import ContactUs from '../ContactUs/ContactUs';
import Partners from '../Partners/Partners';
import Categories from '../Categories/Categories';
import Reviews from '../Reviews/Reviews';

const HomePage = () => {
    return (
      <div className="pt-[75px] md:pt-[84px]">
        <Banner />
        <LatestProducts/>
        <Categories/>
        <ContactUs/>
        <Reviews/>
        <Partners/>
      </div>
    );
};

export default HomePage;