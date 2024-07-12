import Banner from '../Banner/Banner';
import LatestProducts from '../LatestProducts/LatestProducts';
import ContactUs from '../ContactUs/ContactUs';
import Partners from '../Partners/Partners';

const HomePage = () => {
    return (
      <div className="pt-[75px] md:pt-[84px]">
        <Banner />
        <LatestProducts/>
        <ContactUs/>
        <Partners/>
      </div>
    );
};

export default HomePage;