"use client";

import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import Link from "next/link";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import Image from "next/image";

const Kladder = ({ event }) => {
  const sletInputValue = useArtworkStore((state)=>state.sletInputValue);

  return (
      <div className="flex flex-col flex-wrap gap-5 p-5 text-center hover:scale-105 transition-all duration-300">
        <Image
          alt="Billede af"
          width={500}
          height={500}
          src="/placeholder.png"
          className="object-contain max-w-full self-center"
        />
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
