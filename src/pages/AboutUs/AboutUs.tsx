import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import Container from "@/components/Container/Container";
import logo from "@/assets/logo.png";
import StaffCard from "@/components/Cards/StaffCard";
import staffData from "./staff.json";
import SlideInFromLeft from "@/components/Animations/SlideInFromLeft";
import { ClockIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="pt-24 md:pt-28 ">
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <div className="dark:bg-gray-700  pb-10 lg:pb-20" id="about">
        <Container>
          <div className="grid grid-cols-1 gap-10">
            <FadeInUpAnimation>
              <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-10">
                <div>
                  <div className="flex flex-col gap-4 justify-center items-center  mb-5 md:mb-10">
                    <img
                      className="w-32 md:w-48"
                      src={logo}
                      alt="logo"
                      loading="lazy"
                    />
                    <p className="text-3xl md:text-5xl font-semibold text-primary ">
                      Madridista Sports
                    </p>
                  </div>

                  <p className="dark:text-white text-slate-700">
                    Welcome to{" "}
                    <span className="font-semibold text-primary">
                      Madridista Sports
                    </span>
                    , where passion, dedication, and excellence converge.
                  </p>

                  <p className="dark:text-white text-slate-700">
                    Welcome to Madridista Sports, your one-stop destination for
                    all things sports! Established with a passion for the
                    beautiful game, our store is dedicated to providing sports
                    enthusiasts with top-quality gear, apparel, and accessories.
                    Whether you're a player, a coach, or a fan, we have
                    something for everyone.
                  </p>

                  <br />

                  <p className="dark:text-white text-slate-700">
                    Madridista Sports was founded by a team of avid sports fans
                    who recognized the need for a reliable, customer-focused
                    sports shop. Our journey began with the simple idea of
                    making high-quality sports products accessible to everyone.
                    Over the years, we have grown into a trusted name in the
                    sports community, known for our exceptional service and
                    extensive range of products.
                  </p>
                </div>
              </div>
            </FadeInUpAnimation>

            <div className="flex flex-col lg:flex-row justify-center gap-x-10 text-justify ">
              <div className="md:w-1/2 mb-4">
                <SlideInFromLeft>
                  <p className="font-bold text-2xl mb-2 text-primary">
                    Our Mission:
                  </p>
                </SlideInFromLeft>
                <FadeInUpAnimation>
                  <p>
                    Our mission is to empower sports players and fans by
                    providing them with the best gear and equipment. We aim to
                    foster a community where everyone, regardless of their skill
                    level or experience, can find the products they need to
                    enhance their game and express their love for sports. We are
                    committed to:
                  </p>
                  <ul className="list-disc ps-6 mt-2 space-y-2">
                    <li>
                      <span className="font-semibold">Quality:</span> Offering
                      only the best products from leading brands.
                    </li>{" "}
                    <li>
                      <span className="font-semibold">Affordability:</span> {""}
                      Ensuring our products are priced competitively.
                    </li>
                    <li>
                      <span className="font-semibold">Customer Service:</span>{" "}
                      Providing unparalleled support and assistance to our
                      customers.
                    </li>
                  </ul>
                </FadeInUpAnimation>
              </div>
              <div className="md:w-1/2 mb-4">
                <div className="dark:text-white text-slate-700">
                  <SlideInFromLeft>
                    <p className="font-bold text-2xl mb-2 text-primary">
                      Our Vission:
                    </p>
                  </SlideInFromLeft>

                  <FadeInUpAnimation>
                    <p>
                      Our vision is to become the premier destination for sports
                      enthusiasts around the world. We strive to create a global
                      community of sports lovers who share our passion for the
                      sport. We envision a future where:
                    </p>
                    <ul className="list-disc ps-6 mt-2 space-y-2">
                      <li>
                        <span className="font-semibold">Innovation:</span> We
                        continually innovate to bring the latest and greatest in
                        sports gear to our customers.
                      </li>{" "}
                      <li>
                        <span className="font-semibold">Inclusivity:</span> {""}
                        sports is for everyone. We work towards making our
                        products accessible to all, regardless of background or
                        ability.
                      </li>
                      <li>
                        <span className="font-semibold">Sustainability:</span>{" "}
                        We are committed to sustainability and aim to source
                        products and operate our business in an environmentally
                        responsible manner.
                      </li>
                    </ul>
                  </FadeInUpAnimation>
                </div>
              </div>
            </div>
            <div>
              <SlideInFromLeft>
                <p className="font-bold text-2xl mb-2 text-primary">
                  Contact Us:
                </p>
              </SlideInFromLeft>
              <FadeInUpAnimation>
                <div className="grid grid-cols-1 md:grid-cols-3 my-5 py-4 px-8 gap-4">
                  <div className="flex flex-col justify-center items-center">
                    <PhoneIcon className="size-20 text-secondary" />
                    <p className="text-xl font-bold my-2 text-primary">
                      Let's have a conversation
                    </p>
                    <div className="text-gray-600 font-medium text-center">
                      <p>What's App: +88 01711-22334455 </p>
                      <p>Hot Line: +88 09811-222333 </p>
                      <p>Email: madridistasports@inqury.com </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <MapPinIcon className="size-20 text-secondary" />
                    <p className="text-xl font-bold my-2 text-primary">
                      Visit us
                    </p>
                    <div className="text-gray-600 font-medium text-center">
                      <p>
                        Shop# 18,19,20 Block# D,
                        <br /> Level# 01, Ka-244,Progoti sarani,
                        <br /> Baridhara, Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <ClockIcon className="size-20 text-secondary" />
                    <p className="text-xl font-bold my-2 text-primary">
                      We are available
                    </p>
                    <div className="text-gray-600 font-medium text-center">
                      <p>Sunday - Wednesday: 8am - 5pm</p>
                      <p>Contact us before your visit</p>
                      <p>We are available 24/7 on online</p>
                    </div>
                  </div>
                </div>
              </FadeInUpAnimation>
            </div>
            <div>
              <SlideInFromLeft>
                <p className="font-bold text-2xl mb-4 text-primary">
                  Our Staffs:
                </p>
              </SlideInFromLeft>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 mx-auto w-11/12 md:w-full">
                {staffData.staffs.map((staff, index) => (
                  <FadeInUpAnimation key={staff.id} custom={index}>
                    <StaffCard staff={staff} />
                  </FadeInUpAnimation>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <SlideInFromLeft>
                <p className="font-bold text-2xl mb-2 text-primary">
                  Our Shop Address:
                </p>
              </SlideInFromLeft>
              <div>
                <FadeInUpAnimation>
                  {" "}
                  <p className="py-4 font-semibold text-gray-600">
                    Shop# 18,19,20 Block# D, Level# 01, Ka-244,Progoti sarani,
                    Baridhara, Dhaka
                  </p>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29201.007168743487!2d90.4034669934132!3d23.814121820411362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c62fb95f16c1%3A0xb333248370356dee!2sJamuna%20Future%20Park!5e0!3m2!1sen!2sbd!4v1720723103806!5m2!1sen!2sbd"
                    width="100%"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </FadeInUpAnimation>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutUs;
