import Banner from '../Banner/Banner';
import SectionHeader from '@/components/Headers/SectionsHeader';
import LatestProducts from '../LatestProducts/LatestProducts';

const HomePage = () => {
    return (
      <div className="pt-[75px] md:pt-[84px]">
        <Banner />
        <LatestProducts/>
      </div>
    );
};

export default HomePage;