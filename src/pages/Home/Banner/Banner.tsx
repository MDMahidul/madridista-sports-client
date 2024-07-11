// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Styles.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import sliderImage1 from "@/assets/banner/jersey.webp";
import sliderImage2 from "@/assets/banner/shoes.jpg";
import sliderImage3 from "@/assets/banner/ucl-balls.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [animate, setAnimate] = useState(false);

    // to continued the animation
    useEffect(() => {
      setAnimate(true);
      const timeout = setTimeout(() => {
        setAnimate(false);
      }, 700);
      return () => clearTimeout(timeout);
    }, [currentSlide]);

  const sliderData = [
    {
      id: 1,
      name: "Football Jersey",
      image: sliderImage1,
      offer: "15%",
    },
    {
      id: 2,
      name: "Sports Boots",
      image: sliderImage2,
      offer: "25%",
    },
    {
      id: 3,
      name: "Footballs",
      image: sliderImage3,
      offer: "30%",
    },
  ];

  return (
    <div className="h-auto md:h-[87vh]">
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        loop={true}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
      >
        {sliderData.map((item) => (
          <SwiperSlide>
            <div className="relative">
              <img src={item.image} alt="" />
            </div>
            <div className="absolute">
              <div className="md:flex justify-between items-center">
                <div
                  className={`md:w-1/2 flex flex-col justify-center items-center space-y-1 md:space-y-6 md:-ms-28 ${
                    animate ? "fade-in-right" : ""
                  }`}
                >
                  <div className="flex items-end gap-2">
                    <p className="md:offer-percent text-3xl md:text-9xl font-semibold text-tertiary font-robotoSlab">
                      {item.offer}
                    </p>
                    <span className="md:offer-percent text-tertiary font-semibold md:font-bold md:text-2xl">
                      Off
                    </span>
                  </div>
                  <p className="md:product-name md:text-4xl font-bold text-secondary">
                    {item.name}
                  </p>
                  <Link
                    to="/all-products"
                    className="bg-blue-800 px-3 md:px-8 py-1 md:py-3 text-white text-sm md:text-[15px] font-semibold rounded-md hover:bg-primary transform transition-all duration-200 hover:scale-105"
                  >
                    See Details
                  </Link>
                </div>

                <div className="md:w-1/3">
                  <p
                    className={`text-2xl md:text-7xl font-semibold md:font-bold text-secondary md:offer leading-snug md:-ms-28 ${
                      animate ? "fade-in-left" : ""
                    }`}
                  >
                    Exclusive Offers until 15th August
                  </p>
                </div>
              </div>

              <div
                className={`max-w-sm md:max-w-md mx-auto p-1 md:p-2 rounded-lg text-sm md:text-2xl font-bold bg-white text-tertiary mt-4 md:mt-20 ${
                  animate ? "fade-in-up" : ""
                }`}
              >
                Hurry Up! Limited Time Offer! 🚀
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
