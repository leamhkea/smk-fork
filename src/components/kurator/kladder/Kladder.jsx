"use client";
import Image from "next/image";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import useArtworkStore from "@/store/kuratorStore";
import { PublicerServer } from "../opretArrangementer/PublicerServer";
import PopUP from "../global/PopUp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getEvents } from "@/store/artworkUtils";

const Kladder = ({ event, vaerk }) => {
  const sletInputValue = useArtworkStore((state) => state.sletInputValue);
  const { savedEvents } = useArtworkStore.getState();
  const loadKladdeTilRedigering = useArtworkStore(
    (state) => state.loadKladdeTilRedigering
  );
  const updatePublishedEvents = useArtworkStore((state)=>state.updatePublishedEvents);
  const router = useRouter();

  // definerer at input fra zustand skal svare til api'et
  const kladde = savedEvents.find((params) => params.id === event.id);

  const [visPopUpDelete, setVisPopUpDelete] = useState();
  const [visPopUpPublicer, setVisPopUpPublicer] = useState();

  const confirmPublicering = async () => {
    if (kladde) {
      await PublicerServer(kladde);
      const nyeEvents = await getEvents(); //fetch fra utils
      updatePublishedEvents(nyeEvents);
      sletInputValue(kladde.id);
      setVisPopUpPublicer(false);
      
    }
  };

  const redigerEvent = async (id) => {
    await loadKladdeTilRedigering(id);
    router.push("/vaerkarkiv");
  };

  const confirmDelete = () => {
    sletInputValue(event.id);
    setVisPopUpDelete(false);
  };

  return (
    <li className="flex flex-col justify-between gap-5 p-5 text-center h-full min-h-[100px]">
      <div className="w-full h-80 flex items-center border-1 border-gray-300 justify-center overflow-hidden">
        {vaerk?.image_thumbnail && (
          <Image
            src={vaerk.image_thumbnail}
            alt={`Billede af ${vaerk.title}`}
            width={200}
            height={200}
            className="object-cover max-w-full"
          />
        )}
      </div>

      <div className="flex flex-col justify-between flex-1">
        <h2>{event.title}</h2>
        <p>{event.date}</p>

        <SecondaryButton onClick={() => redigerEvent(event.id)}>
          Rediger
        </SecondaryButton>

        <TertrieryButton onClick={() => setVisPopUpPublicer(true)}>
          Publicer
        </TertrieryButton>

        <button
          className=" hover:text-red-600 mt-5"
          onClick={() => setVisPopUpDelete(true)}
        >
          Slet kladde
        </button>
      </div>
      {visPopUpDelete && (
        <PopUP>
          Er du sikker på, du vil slette denne kladde? <br />
          Denne handling kan ikke fotrydes
          <div className="flex gap-5">
            <SecondaryButton onClick={confirmDelete}>Ja</SecondaryButton>
            <TertrieryButton onClick={() => setVisPopUpDelete(false)}>
              Nej
            </TertrieryButton>
          </div>
        </PopUP>
      )}
      {visPopUpPublicer && (
        <PopUP>
          Er du sikker på, du vil publicere denne kladde? <br />
          Denne handling kan ikke fotrydes
          <p className="text-red-500 text-sm">OBS: Der går et øjeblik før eventet er synlig efter publicering.</p>
          <div className="flex gap-5">
            <TertrieryButton onClick={confirmPublicering}>Ja</TertrieryButton>
            <SecondaryButton onClick={() => setVisPopUpPublicer(false)}>
              Nej
            </SecondaryButton>
          </div>
        </PopUP>
      )}
    </li>
  );
};

export default Kladder;
