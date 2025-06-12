"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Ramme = ({ className = "", style = {}, children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{ ...style, transformOrigin: "right" }}
      className={`inline-block origin-right md:px-50 px-10 py-5 mx-auto overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Ramme;
