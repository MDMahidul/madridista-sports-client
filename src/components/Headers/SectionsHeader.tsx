
import SlideInFromLeft from "../Animations/SlideInFromLeft";

type TSectionHeader = {
  heading: string;
};

const SectionHeader = ({ heading }: TSectionHeader) => {
  return (
    <SlideInFromLeft custom={1}>
      <div className=" text-center md:w-4/12 mx-auto py-10 ">
        <h3 className="md:text-4xl text-3xl text-primary py-4 font-semibold md:font-bold">
          {heading}
        </h3>
      </div>
    </SlideInFromLeft>
  );
};

export default SectionHeader;
