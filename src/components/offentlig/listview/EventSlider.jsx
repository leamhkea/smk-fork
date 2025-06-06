"use client";

import { useEffect, useRef, useState } from "react";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import ListCard from "./ListCard";

const EventSlider = ({ title, events, art }) => {
  // index: Hvilket "trin" slideren er på (0 = start). Bruges til at beregne hvor langt vi skal scroll
  // Når man klikker pil til højre, øges index, og hele rækken af kort forskydes til venstre
  const [index, setIndex] = useState(0);

  // cardWidth: Bredden på ét kort i pixels (måles med ref). Bruges til at udregne præcis hvor langt rækken skal flyttes ved scroll.
  const [cardWidth, setCardWidth] = useState(0);

  // visibleCards: Hvor mange kort er synlige på én gang. Bruges til at vide, hvornår vi skal stoppe med at scrolle.
  // Hvis containeren er 1000px bred og hvert kort er 250px, så er visibleCards = 4
  const [visibleCards, setVisibleCards] = useState(1);

  // cardRef: Reference til det første kort, så vi kan måle bredden
  const cardRef = useRef(null);

  // containerRef: ref til den synlige visning (viewport) → bruges til at måle hele containerens bredde
  const containerRef = useRef(null);

  useEffect(() => {
    // measure() bliver kaldt når komponenten loader og hver gang vinduet ændrer størrelse
    const measure = () => {
      // Den måler: card (bredden på et card) container (bredden på hele visningsområdet)
      if (!cardRef.current || !containerRef.current) return;
      const card = cardRef.current.offsetWidth;
      const container = containerRef.current.offsetWidth;

      // F.eks. 1000 / 250 = 4. Vi kan se 4 kort ad gangen
      const numVisible = Math.floor(container / card);

      // Det hele bliver gemt i state med setCardWidth og setVisibleCards
      setCardWidth(card);
      setVisibleCards(numVisible);
    };

    measure();
    // Slideren måler igen, hver gang brugeren ændrer vinduets størrelse
    window.addEventListener("resize", measure);

    // "Clean up" – fjerner event listener, når komponenten unmountes (best practice i React)
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
        {/* ===================== VENSTRE PIL ====================== */}
        <CgArrowLongLeft
          onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
          className={`text-black cursor-pointer hover:scale-110 transition-all ${
            index === 0 ? "opacity-0 cursor-not-allowed" : ""
          }`}
          size={30}
        />

        {/* ================= CONTAINER FOR EVENTS ================== */}
        <div ref={containerRef} className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * cardWidth}px)`,
            }}
          >
            {/* event:   Objektet med data for ét enkelt arrangement */}
            {/*    i:    Indexet i events-arrayet (0, 1, 2, ...) */}
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

        {/* ===================== HØJRE PIL ====================== */}
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
