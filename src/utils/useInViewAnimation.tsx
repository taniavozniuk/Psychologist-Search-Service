import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const useScrollAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return { ref, inView };
};

  export const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
};
  
export const FadeInSection = ({ children }: { children: ReactNode }) => (
  <motion.div
    className="conteiner__section"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    {children}
  </motion.div>
);