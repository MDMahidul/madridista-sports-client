import FadeInUpAnimation from '@/components/Animations/FadeInUpAnimation';
import Container from '@/components/Container/Container';
import Lottie from "lottie-react";
import mail from "@/assets/mail.json";
import SectionHeader from '@/components/Headers/SectionsHeader';

const ContactUs = () => {
    return (
      <div className="md-5 md:mb-10">
        <SectionHeader heading={"Contact Us"} />
        <Container>
          <FadeInUpAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 my-5 py-4 px-8 border-2 border-gray-50 gap-4">
              <div className="flex justify-center items-center">
                <Lottie
                  className="max-w-[200px] md:max-w-sm"
                  animationData={mail}
                  loop={true}
                />
              </div>
              <form className="contact-form pt-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-base font-semibold dark:text-white mb-1"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:border-blue-600 bg-white dark:bg-slate-500"
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-base font-semibold dark:text-white mb-1"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:border-blue-600 bg-white dark:bg-slate-500"
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-base font-semibold dark:text-white mb-1"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:border-blue-600 bg-white dark:bg-slate-500"
                    rows="3"
                    id="message"
                    placeholder="Write your message"
                  ></textarea>
                </div>
                <button className="primary-button">Submit</button>
              </form>
            </div>
          </FadeInUpAnimation>
        </Container>
      </div>
    );
};

export default ContactUs;