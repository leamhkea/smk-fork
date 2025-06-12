"use client";

// Import fra react og egne components
import dynamic from "next/dynamic";

const PopUP = dynamic(() => import("../global/PopUp"), {
  ssr: false, // Kun client-side
  loading: () => null, // Evt. vis en spinner hvis ønsket
});

//imports af egne komponenter
import PrimaryButton from "@/components/global/buttons/PrimaryButton";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import { PublicerServer } from "../opretArrangement/PublicerServer";
import { getEvents } from "@/store/artworkUtils";

//imports udefra
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Kladder = ({ event, vaerk }) => {
  //zustand store imports
  const sletInputValue = useArtworkStore((state) => state.sletInputValue);
  const { savedEvents } = useArtworkStore.getState();
  const loadKladdeTilRedigering = useArtworkStore(
    (state) => state.loadKladdeTilRedigering
  );
  const updatePublishedEvents = useArtworkStore(
    (state) => state.updatePublishedEvents
  );

  //router import
  const router = useRouter();

  //popOver states
  const [visPopUpDelete, setVisPopUpDelete] = useState();
  const [visPopUpPublicer, setVisPopUpPublicer] = useState();

  // definerer at input fra zustand skal svare til api'et
  const kladde = savedEvents.find((params) => params.id === event.id);

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
            loading="lazy"
          />
        )}
      </div>

      <div className="flex flex-col justify-between flex-1">
        <h2>{event.title}</h2>
        <p>{event.date}</p>

        <PrimaryButton onClick={() => redigerEvent(event.id)}>
          Rediger
        </PrimaryButton>

        <SecondaryButton onClick={() => setVisPopUpPublicer(true)}>
          Publicer
        </SecondaryButton>

        <button
          className=" hover:text-red-600 mt-5"
          onClick={() => setVisPopUpDelete(true)}
        >
          Slet kladde
        </button>
      </div>

      {/* popUp til at sikre at brugeren vil slette arrangement */}
      {visPopUpDelete && (
        <PopUP>
          Er du sikker på, du vil slette denne kladde? <br />
          Denne handling kan ikke fotrydes
          <div className="flex gap-5">
            <PrimaryButton onClick={confirmDelete}>Ja</PrimaryButton>
            <SecondaryButton onClick={() => setVisPopUpDelete(false)}>
              Nej
            </SecondaryButton>
          </div>
        </PopUP>
      )}

      {/* PopUp til at sikre at brugeren vil publicere arrangement */}
      {visPopUpPublicer && (
        <PopUP>
          Er du sikker på, du vil publicere denne kladde? <br />
          Denne handling kan ikke fotrydes
          <p className="text-red-500 text-sm">
            OBS: Der går et øjeblik før eventet er synlig efter publicering.
          </p>
          <div className="flex gap-5">
            <SecondaryButton onClick={confirmPublicering}>Ja</SecondaryButton>
            <PrimaryButton onClick={() => setVisPopUpPublicer(false)}>
              Nej
            </PrimaryButton>
          </div>
        </PopUP>
      )}
    </li>
  );
};

export default Kladder;
