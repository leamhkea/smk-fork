"use client";
import Kladder from "./Kladder";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import { useEffect, useRef, useState } from "react";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";

const ListKladder = ({art}) => {
    const {savedEvents} = useArtworkStore();
    const kladdeSum = useArtworkStore((state)=>state.kladdeSum());

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
  const maxIndex = Math.max(savedEvents.length - visibleCards, 0);

    return ( 
        <div className="mb-10">
            <div className="flex justify-between items-center">
                <h1>Mine kladder ({kladdeSum})</h1>
                <div>
                    <a href="/opretarrangement">
                    <SecondaryButton>Opret nyt arrangement</SecondaryButton></a>
                </div>
            </div>

            <div className="relative w-full flex items-center">
                {/* venstre pil */}
                <CgArrowLongLeft
                onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                className={`text-(--black) cursor-pointer hover:scale-110 transition-all ${
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
                        {savedEvents && savedEvents.length > 0 ? (
                        savedEvents.map((event, i) => (
                            <div
                              key={event.id}
                              ref={i === 0 ? cardRef : null}
                              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2 box-border"
                            >
                              <Kladder art={art} event={event} />
                            </div>
                          ))                          
                        ) : (
                        // Denne div bevarer layoutet, men viser kun tekst
                        <div className="w-full px-4 py-8">
                            <p className="text-center text-gray-500">Du har ingen gemte kladder</p>
                        </div>
                        )}
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

            <hr/>
        </div>
     );
}
 
export default ListKladder;