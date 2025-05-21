"use client";

import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import Link from "next/link";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import Image from "next/image";

const Kladder = ({ event, art }) => {
  const sletInputValue = useArtworkStore((state)=>state.sletInputValue);  
  const visibleArtworks = useArtworkStore((state) => state.visibleArtworks);


  console.log("event.artworkIds:", event.artworkIds);
  

// Matcher artworkIds med object_number i art
  const matchedArtworks = art.inventarnummer?.length
  ? visibleArtworks.filter((artwork) =>
      art.inventarnummer.includes(artwork.object_number)
    )
  : [];


  console.log("matchedArtworks:", matchedArtworks);

  return (
      <div className="flex flex-col flex-wrap gap-5 p-5 text-center hover:scale-105 transition-all duration-300">
          {matchedArtworks[0]?.image_thumbnail && (
          <Image
            alt="artwork"
            width={400}
            height={400}
            src={matchedArtworks[0].image_thumbnail}
          />
        )}
        <h2>{event.titel}</h2>
        <p>{event.beskrivelse}</p>
        <p>{event.dato}</p>
      <div>
        <SecondaryButton>Rediger</SecondaryButton>
        <TertrieryButton>Publicer</TertrieryButton>
        </div>
        <button onClick={() => sletInputValue(event.id)}  className="hover:text-red-500 transition-all duration-300">Slet arrangement</button>
      </div>
  );
};

export default Kladder;
