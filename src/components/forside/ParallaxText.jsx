"use client";
import { motion } from "framer-motion";
import React from "react";

const ParallaxText = () => {
  const baseText = "SMK | Statens Museum for Kunst | "; //definerer teksten så det ikke skal skrives manuelt som html

  return (
    <div className="overflow-x-hidden whitespace-nowrap w-full py-8 pt-40 flex flex-col gap-2">
      <motion.div
        className="flex w-max"
        animate={{ x: ["-5%", "0%"] }} //styrer hastighed efter containeren
        transition={{
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <h1 className="bold mr-8">
          {baseText.repeat(10)}
        </h1>
        <h1 className="bold mr-8">
          {baseText.repeat(10)}
        </h1>
      </motion.div>
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-5%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <h1 className="bold mr-8">
          {baseText.repeat(10)}
        </h1>
        <h1 className="bold mr-8">
          {baseText.repeat(10)}
        </h1>
      </motion.div>
    </div>
  );
};

export default ParallaxText;
