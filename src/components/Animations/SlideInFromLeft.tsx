import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type SlideInFromLeftProps = {
  children: ReactNode;
  custom?: number;
};

const SlideInFromLeft = ({
  children,
  custom,
}: SlideInFromLeftProps) => {
  const slideInFromLeft: Variants = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.07 * index,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      variants={slideInFromLeft}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={custom}
    >
      {children}
    </motion.div>
  );
};

export default SlideInFromLeft;
