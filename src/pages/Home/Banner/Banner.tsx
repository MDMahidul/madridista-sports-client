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
        {sliderData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent bg-opacity-60 dark:bg-opacity-80"></div>
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
                    <p className="offer-percent text-3xl md:text-9xl font-semibold text-tertiary font-robotoSlab">
                      {item.offer}
                    </p>
                    <span className="offer-percent text-tertiary font-semibold md:font-bold md:text-2xl">
                      Off
                    </span>
                  </div>
                  <p className="product-name md:text-4xl font-bold text-secondary !mb-2">
                    {item.name}
                  </p>
                  <Link
                    to="/all-products"
                    className="primary-button"
                  >
                    <button> Explore More</button>
                  </Link>
                </div>

                <div className="md:w-1/3">
                  <p
                    className={`text-2xl md:text-7xl font-semibold md:font-bold text-secondary offer !leading-snug md:-ms-28 ${
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
