"use client";

import { useEffect, useRef, useState } from "react";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import ListCard from "./ListCard";

const EventSlider = ({ title, events, art }) => {
  // index: Hvor mange kort der er scroll'et til højre
  const [index, setIndex] = useState(0);

  // cardWidth: Bredden på ét kort i pixels (måles med ref)
  const [cardWidth, setCardWidth] = useState(0);

  // visibleCards: Hvor mange kort er synlige på én gang
  const [visibleCards, setVisibleCards] = useState(1);

  // cardRef: ref til første kort → bruges til at måle bredden
  const cardRef = useRef(null);

  // containerRef: ref til den synlige visning (viewport) → bruges til at måle hele containerens bredde
  const containerRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (!cardRef.current || !containerRef.current) return;
      const card = cardRef.current.offsetWidth;
      const container = containerRef.current.offsetWidth;

      const numVisible = Math.floor(container / card);
      setCardWidth(card);
      setVisibleCards(numVisible);
    };

    measure(); // initial måling
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Kan ikke scrolle længere end der er kort, og hvis der er færre kort end plads, bliver maxIndex 0 → ingen scroll
  const maxIndex = Math.max(events.length - visibleCards, 0);

  // Vis ikke nogle cards, hvis lokationen ikke har events
  if (!events || events.length === 0) return null;


  return (
    <div className="mb-20 grid gap-10">
      <h2 className="text-center underline">{title}</h2>

      <div className="relative w-full flex items-center">
        {/* Venstre pil */}
        <CgArrowLongLeft
          onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
          className={`text-black cursor-pointer hover:scale-110 transition-all ${
            index === 0 ? "opacity-0 cursor-not-allowed" : ""
          }`}
          size={30}
        />

        {/* Container */}
        <div ref={containerRef} className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * cardWidth}px)`,
            }}
          >
            {/* event:   Objektet med data for ét enkelt arrangement */}
            {/*    i:    ndexet i events-arrayet (0, 1, 2, ...) */}
            {events.map((event, i) => (

              <div
                // React skal bruge en unik nøgle for hvert element i en liste, så den effektivt kan holde styr på ændringer. unik ID for hvert arrangement
                key={event.id} 
                // Måle ét kort (det første) for at beregne, hvor mange der kan vises ad gangen i slideren
                ref={i === 0 ? cardRef : null}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2 box-border"
              >
                <ListCard event={event} art={art} />

              </div>
            ))}
          </div>
        </div>

        {/* Højre pil */}
        <CgArrowLongRight
          onClick={() => setIndex((prev) => Math.min(prev + 1, maxIndex))}
          className={`text-black cursor-pointer hover:scale-110 transition-all ${
            index >= maxIndex ? "opacity-0 cursor-not-allowed" : ""
          }`}
          size={30}
        />
      </div>
    </div>
  );
};

export default EventSlider;
