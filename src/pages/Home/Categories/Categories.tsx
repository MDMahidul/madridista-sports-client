import FadeInUpAnimation from '@/components/Animations/FadeInUpAnimation';
import CategoryCard from '@/components/Cards/CategoryCard';
import Container from '@/components/Container/Container';
import SectionHeader from '@/components/Headers/SectionsHeader';

const Categories = () => {
  const sports = [
    {
      id: 1,
      name: "football",
      image:
        "https://cdn.britannica.com/51/190751-131-B431C216/soccer-ball-goal.jpg",
    },
    {
      id: 2,
      name: "cricket",
      image:
        "https://cdn.britannica.com/47/148847-050-C4FB5341/Cricket-bat-ball.jpg",
    },
    {
      id: 3,
      name: "tennis",
      image:
        "https://reviewed-com-res.cloudinary.com/image/fetch/s--UJ2sGByA--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1597356287543/GettyImages-1171084311.jpg",
    },
    {
      id: 4,
      name: "basketball",
      image:
        "https://facts.net/wp-content/uploads/2024/01/23-best-basketball-history-facts-1705406196.jpg",
    },
    {
      id: 5,
      name: "golf",
      image:
        "https://portstephens-australia.com/wp-content/uploads/2022/02/port-stephens-golf.jpg",
    },
    {
      id: 6,
      name: "baseball",
      image: "https://nativebag.in/wp-content/uploads/2022/05/baseball.jpg",
    },
  ];
    return (
      <div className="md-5 md:mb-10">
        <SectionHeader heading="Products Categories" />
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 md:gap-y-10 ">
            {sports.map((sport,index) => (
              <FadeInUpAnimation key={index} custom={index}>
                <CategoryCard sport={sport}/>
              </FadeInUpAnimation>
            ))}
          </div>
        </Container>
      </div>
    );
};

export default Categories;