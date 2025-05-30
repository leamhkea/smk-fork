"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SlideRight = ({ children }) => {
  const containerRef = useRef(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end start", "start end"], 
  });

  // Flyt til højre ved scroll
  const x = useTransform(scrollYProgress, [1, 0], [-80, 0]);

  return (
    <div ref={containerRef}>
      <motion.div style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
};

export default SlideRight;
