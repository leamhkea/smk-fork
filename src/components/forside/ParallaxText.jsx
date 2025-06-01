"use client";
import { motion } from "framer-motion";
import React from "react";
import ScrollFlow from "../global/ScrollFlow";

const ParallaxText = () => {
  const baseText = "SMK | Statens Museum for Kunst | "; //definerer teksten så det ikke skal skrives manuelt som html

  return (
    <ScrollFlow>
    <div className="overflow-x-hidden whitespace-nowrap w-full py-8 pt-40 flex flex-col gap-2">
      <motion.div
        className="flex w-max"
        animate={{ x: ["-10%", "0%"] }} //styrer hastighed efter containeren
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
        <h1 className="bold mr-8">{baseText.repeat(10)}</h1>
        <h1 className="bold mr-8">{baseText.repeat(10)}</h1>
      </motion.div>
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-10%"] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
        <h1 className="bold mr-8">{baseText.repeat(10)}</h1>
        <h1 className="bold mr-8">{baseText.repeat(10)}</h1>
      </motion.div>
    </div>
    </ScrollFlow>
  );
};

export default ParallaxText;

//DOKUMENTATION BRUGT

//repeat()
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat