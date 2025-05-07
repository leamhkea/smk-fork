"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Ramme = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        width: isVisible ? "100%" : "40%",
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
      }}
      className="transition-all duration-1100 ease-out border-10 border-(--blue) mx-auto lg:p-30 md:p-20 sm:p-10 overflow-hidden"
    >
      {children}
    </div>
  );
};

export default Ramme;
