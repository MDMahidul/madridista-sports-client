import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import partners from '../../../../public/partners.json';

const Partners = () => {
    return (
      <div>
        <SectionHeader heading={"Our Partners"} />
        <Container>
          <div className="flex justify-center items-center flex-wrap gap-10 mt-4 p-4 md:w-11/12 mx-auto">
            {partners.map((item, index) => (
              <FadeInUpAnimation custom={index} key={item.id}>
                <img className="w-24 md:w-40" src={item.src} alt="" />
              </FadeInUpAnimation>
            ))}
          </div>
        </Container>
      </div>
    );
};

export default Partners;