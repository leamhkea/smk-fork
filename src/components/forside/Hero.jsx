"use client";
//import af egne komponenter
import Ramme from "../global/Ramme";
//imports udefra
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const Hero = ({ art, events }) => {
  const matchedArtworks = events.artworkIds?.length
    ? art?.filter((artwork) =>
        events.artworkIds.includes(artwork.object_number)
      )
    : [];

  //useRef
  const containerRef = useRef(null);

  // Scroll-progress i forhold til containeren
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transformér scroll til y aksens bevægelse (parallax-delen)
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden -z-10"
    >
      {/* Baggrundsbillede */}
      {matchedArtworks?.[0]?.image_thumbnail && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-[-1] will-change-transform"
        >
          <Image
            alt="artwork"
            src={matchedArtworks[0].image_thumbnail}
            fill
            priority
            className="object-cover w-full h-full z-0"
            loading="lazy"
          />
        </motion.div>
      )}
      {/* Indhold ovenpå billedet */}
      <article className="relative flex flex-col z-0 justify-between gap-8 h-full p-8 text-white bg-black/50">
        <Ramme className="mt-20 pb-50 border-(--blue) border-[10px]">
          <div className="flex flex-col gap-10 pt-30">
            <div>
              <h1 className="text-4xl font-bold">{events.title} |</h1>
              <h2 className="text-2xl">{events.date}</h2>
            </div>

            <p className="max-w-xl">{events.description}</p>
          </div>
        </Ramme>
      </article>
    </div>
  );
};

export default Hero;
