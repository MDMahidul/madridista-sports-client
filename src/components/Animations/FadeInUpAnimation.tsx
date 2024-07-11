import React, { useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";

interface FadeInUpAnimationProps {
  children: React.ReactNode;
  custom?: number;
  trigger?: boolean; // New prop to manually trigger the animation
}

const FadeInUpAnimation: React.FC<FadeInUpAnimationProps> = ({
  children,
  custom,
  trigger,
}) => {
  const controls = useAnimation();

  const fadeInAnimation: Variants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.07 * index,
        duration: 0.5,
      },
    }),
  };

  useEffect(() => {
    if (trigger) {
      controls.start("animate");
    }
  }, [trigger, controls]);

  return (
    <motion.div
      variants={fadeInAnimation}
      initial="initial"
      animate={controls}
      custom={custom}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUpAnimation;
