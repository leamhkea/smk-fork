import useArtworkStore from "@/store/kuratorStore";
import Kladder from "./Kladder";
import { useEffect, useState, useRef } from "react";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ListKladder = ({ art }) => {
  const { savedEvents } = useArtworkStore();
  const kladdeSum = useArtworkStore((state) => state.kladdeSum());
  const { resetForm } = useArtworkStore();

  const [match, setMatchh] = useState(false);
  const [index, setIndex] = useState(0);
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  const router = useRouter();

  // Hydration til Zustand
  useEffect(() => {
    setMatchh(true);
  }, []);

  // Map og match værker
  const kladderMedVaerker = match
    ? savedEvents
        .map((event) => {
          const matchingVaerk = art.find(
            (vaerk) => vaerk.object_number === event.artworkIds?.[0] //finder smks object_number
          );
          return { ...event, matchedVaerk: matchingVaerk }; // behold alle events også hvis den ikke kan finde værket
        })
        .filter(Boolean)
    : [];

    //opret arrangement
    const nytEvent = ()=>{
      resetForm();
      router.push("/vaerkarkiv")
    }

  // Mål kort og container
  useEffect(() => {
    const measure = () => {
      if (!cardRef.current || !containerRef.current) return;
      const card = cardRef.current.offsetWidth;
      const container = containerRef.current.offsetWidth;
      const numVisible = Math.floor(container / card);
      setCardWidth(card);
      setVisibleCards(numVisible);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxIndex = Math.max(kladderMedVaerker.length - visibleCards, 0);



  return (
    <div className="px-4 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2>Mine kladder ({kladdeSum})</h2>
        <Link href="/vaerkarkiv">
          <SecondaryButton onClick={nytEvent}>Opret arrangement</SecondaryButton>
        </Link>
      </div>

      {match ? (
        kladderMedVaerker.length > 0 ? (
          <div className="mb-20 relative w-full flex items-center gap-2">
            <CgArrowLongLeft
              onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
              className={`text-black cursor-pointer hover:scale-110 transition-all ${
                index === 0 ? "opacity-0 cursor-not-allowed" : ""
              }`}
              size={30}
            />

            <div ref={containerRef} className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${index * cardWidth}px)`,
                }}
              >
                {kladderMedVaerker.map((event, i) => (
                  <div
                    key={event.id}
                    ref={i === 0 ? cardRef : null}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2 box-border"
                  >
                    <Kladder event={event} vaerk={event.matchedVaerk} />
                  </div>
                ))}
              </div>
              <hr />
            </div>

            <CgArrowLongRight
              onClick={() => setIndex((prev) => Math.min(prev + 1, maxIndex))}
              className={`text-black cursor-pointer hover:scale-110 transition-all ${
                index >= maxIndex ? "opacity-0 cursor-not-allowed" : ""
              }`}
              size={30}
            />
          </div>
        ) : (
          <p className="text-center m-10 text-gray-500 italic">
            Du har ingen gemte kladder.
          </p>
        )
      ) : null}
    </div>
  );
};

export default ListKladder;

//DOKUMENTATION BRUGT 

//filter boolean
//https://michaeluloth.com/javascript-filter-boolean/

//hydration
//https://stackoverflow.com/questions/73451295/how-to-solve-react-hydration-error-in-next