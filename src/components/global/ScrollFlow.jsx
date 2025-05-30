"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollFlow = ({ children }) => {
  const containerRef = useRef(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], 
  });

  // Flyt opad ved scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Fade ud ved scroll (fra 1 til 0 i opacity)
  const opacity = useTransform(scrollYProgress, [0, 1], [1, -0]);

  return (
    <div ref={containerRef}>
      <motion.div style={{ y, scale, opacity }}>
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollFlow;
