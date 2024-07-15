import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import Container from "@/components/Container/Container";
import ShiftingCountdown from "@/components/Countdown/Countdown";
import SectionHeader from "@/components/Headers/SectionsHeader";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const SuccessPage = () => {
    return (
      <div className="pt-10 md:pt-16">
        <Helmet>
          <title>Order Placed</title>
        </Helmet>
        <Container>
          <SectionHeader heading="Congratulations!!!" />
          <FadeInUpAnimation>
            <div className="text-center mb-20">
              <p className="text-lg font-semibold text-gray-600 mb-16">
                Your order has been placed successfully. Order will be arrived
                with 7 days.
              </p>
              <Link to="/all-products" className="primary-button">
                Shop Again
              </Link>
            </div>
          </FadeInUpAnimation>
          <FadeInUpAnimation>
            <ShiftingCountdown />
          </FadeInUpAnimation>
        </Container>
      </div>
    );
};

export default SuccessPage;