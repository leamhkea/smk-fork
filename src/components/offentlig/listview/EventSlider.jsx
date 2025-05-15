"use client";

import { useState } from "react";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import ListCard from "./ListCard";

const EventSlider = ({ title, events }) => {
  // index: Viser hvor langt til højre vi har scrollet.
  const [index, setIndex] = useState(0);

  // maxIndex: Hvor langt vi maksimalt kan scrolle til højre, så vi ikke går ud over listen.
  const maxIndex = events.length - 1;

  // Hvis der ingen events er, så vises ingenting
  if (!events || events.length === 0) return null;

  return (
    <div className="mb-20 grid gap-10">
      <h2 className="text-center underline">{title}</h2>

      <div className="relative w-full flex items-center">
        {/* Når man klikker, reduceres index med 1, men ikke under 0 */}
        <CgArrowLongLeft
          onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
          className="text-black cursor-pointer hover:scale-110 transition-all"
          size={30}
        />

        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              // Flytter hele rækken af cards til venstre, baseret på index
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2 box-border"
              >
                <ListCard event={event} />
              </div>
            ))}
          </div>
        </div>

        {/* Øger index med 1, men ikke højere end maxIndex */}
        <CgArrowLongRight
          onClick={() => setIndex((prev) => Math.min(prev + 1, maxIndex))}
          className="text-black cursor-pointer hover:scale-110 transition-all"
          size={30}
        />
      </div>
    </div>
  );
};

export default EventSlider;
