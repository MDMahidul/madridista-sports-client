import FadeInUpAnimation from '@/components/Animations/FadeInUpAnimation';
import Container from '@/components/Container/Container';
import Lottie from "lottie-react";
import mail from "@/assets/mail.json";
import SectionHeader from '@/components/Headers/SectionsHeader';
import { FieldValues, useForm } from 'react-hook-form';

const ContactUs = () => {
        const { register, handleSubmit, reset, formState: { errors },  } = useForm();

   const onSubmit = (data: FieldValues) => {
     
     reset();
   };

    return (
      <div className="md-5 md:mb-10">
        <SectionHeader heading={"Contact Us"} />
        <Container>
          <FadeInUpAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 my-5 py-4 px-8 border-2 border-gray-50 gap-4 shadow">
              <div className="flex justify-center items-center">
                <Lottie
                  className="max-w-[200px] md:max-w-sm"
                  animationData={mail}
                  loop={true}
                />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="contact-form pt-4"
              >
                <div className="mb-4">
                  <label className="add-product-label" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    className="add-input-field"
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500">
                      Name is required *
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="add-product-label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    className="add-input-field"
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      Email is required *
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="add-product-label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="add-input-field"
                    rows="3"
                    id="message"
                    placeholder="Write your message"
                    {...register("message", { required: true })}
                  ></textarea>
                  {errors.message && (
                    <span className="text-xs text-red-500">
                      Message is required *
                    </span>
                  )}
                </div>
                <button type="submit" className="primary-button">
                  Submit
                </button>
              </form>
            </div>
          </FadeInUpAnimation>
        </Container>
      </div>
    );
};

export default ContactUs;