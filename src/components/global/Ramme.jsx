"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Ramme = ({ className = "", style = {}, children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ width: "5%", x: "100%" }}
      animate={inView ? { width: "100%", x: 0 } : {}}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={style}
      className={`relative p-10 mx-auto overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Ramme;
