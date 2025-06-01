"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PopUP = ({ children }) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  if (!inView) return null;

  return createPortal(
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex justify-center items-center">
      <motion.div
        className="bg-(--white) p-10 shadow-md max-w-xl w-full"
        animate={{ y: ["100", "-20%"] }}
        transition={{
          triggerOnce: true,
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>,
    document.body // her rendres den i <body> uafhængigt af placeringen
  );
};

export default PopUP;

//DOKUMENTATION BRUGT
//https://developer.mozilla.org/en-US/docs/Web/API/Document/body
