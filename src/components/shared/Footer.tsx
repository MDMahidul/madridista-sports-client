import logo from "../../assets/logo.png";
import facebook from "../../assets/social/facebook.png";
import instagram from "../../assets/social/instagram.png";
import tiktok from "../../assets/social/tiktok.png";
import twitter from "../../assets/social/twitter.png";
import youtube from "../../assets/social/youtube.png";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EnvelopeIcon,PhoneIcon,MapPinIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className="mt-16 py-14 bg-amber-100 dark:bg-gray-600 text-base-content">
        <Container>
          <div className="flex flex-col md:flex-row justify-between  gap-10 md:gap-0">
            <aside className="md:w-1/4">
              <div className="flex flex-col items-center">
                <img
                  loading="lazy"
                  className="w-20 md:w-24 mr-2"
                  src={logo}
                  alt="Madridista Sports Logo"
                />
                <p className="text-2xl md:text-3xl lg:text-[28px] font-bold text-primary">
                  Madridista Sports
                </p>
              </div>
              <p className="mt-2 text-base text-justify">
                Your one-stop shop for all things sports. Quality gear for
                football, basketball, running, and more. Our commitment is to
                provide excellent customer service and ensure you have
                everything you need to perform at your best.
              </p>
            </aside>
            <nav className="md:w-1/4">
              <header className="font-bold text-xl text-primary mb-3 dark:text-white">
                Contact Us
              </header>
              <div className="flex flex-col space-y-3 text-base dark:text-white">
                <p className="flex items-center gap-1">
                  <PhoneIcon className="size-5 text-primary" /> +88
                  01711-22334455
                </p>
                <p className="flex items-center gap-1">
                  <PhoneIcon className="size-5 text-primary" /> +88 09811-222333
                </p>
                <p className="flex items-center gap-1">
                  <EnvelopeIcon className="size-5 text-primary" />
                  madridistasports@inqury.com
                </p>
                <p className="">
                  Shop# 18,19,20 Block# D, Level# 01, Ka-244,Progoti sarani,
                  Baridhara, Dhaka
                </p>
              </div>
            </nav>
            <nav>
              <header className="font-bold text-xl text-primary mb-3 dark:text-white ">
                Quick Links
              </header>
              <div className="flex flex-col gap-4 md:gap-0 items-start md:space-y-3 text-base  dark:text-white">
                <Link to="/" className="link link-hover hover:text-amber-500">
                  Home
                </Link>
                <Link
                  to="/all-products"
                  className="link link-hover hover:text-amber-500"
                >
                  All Products
                </Link>
                <Link
                  to="/manage-products"
                  className="link link-hover hover:text-amber-500"
                >
                  Manage Products
                </Link>
                <Link
                  to="/about-us"
                  className="link link-hover hover:text-amber-500"
                >
                  About Us
                </Link>
                <Link
                  to="/cart"
                  className="link link-hover hover:text-amber-500"
                >
                  Cart
                </Link>
              </div>
            </nav>
            <form className="md:w-1/4">
              <header className="font-bold text-xl text-primary mb-3 dark:text-white">
                Follow Us On
              </header>

              <div className="flex justify-start space-x-4   md:py-3">
                <Link to="#">
                  <img
                    className="w-6 md:w-8 transform transition-all hover:scale-105 duration-200"
                    src={facebook}
                    alt=""
                  />
                </Link>
                <Link to="#">
                  <img
                    className="w-6 md:w-8 transform transition-all hover:scale-105 duration-200"
                    src={instagram}
                    alt=""
                  />
                </Link>
                <Link to="#">
                  <img
                    className="w-6 md:w-8 transform transition-all hover:scale-105 duration-200"
                    src={tiktok}
                    alt=""
                  />
                </Link>
                <Link to="#">
                  <img
                    className="w-6 md:w-8 transform transition-all hover:scale-105 duration-200"
                    src={twitter}
                    alt=""
                  />
                </Link>
                <Link to="#">
                  <img
                    className="w-6 md:w-8 transform transition-all hover:scale-105 duration-200"
                    src={youtube}
                    alt=""
                  />
                </Link>
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2 my-4">
                <Input type="email" placeholder="Email" />
                <Button className="bg-primary text-white" type="submit">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </footer>
      <div className="text-center p-6 bg-amber-100 dark:bg-gray-600 text-base-content border-t border-slate-300">
        <p className="dark:text-white">
          Copyright © {year} - All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
