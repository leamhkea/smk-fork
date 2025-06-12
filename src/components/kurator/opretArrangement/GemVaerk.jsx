"use client";
import useArtworkStore from "@/store/kuratorStore";
import PopUP from "../global/PopUp";
import { useEffect, useState } from "react";
import PrimaryButton from "@/components/global/buttons/PrimaryButton";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";

const GemVaerk = ({ vaerk, events }) => {
  const gemteVaerker = useArtworkStore((state) => state.gemteVaerker);
  const addVaerk = useArtworkStore((state) => state.addVaerk);
  const sletVaerk = useArtworkStore((state) => state.sletVaerk);
  const selectedLocation = useArtworkStore((state) => state.selectedLocation);
  const selectedDate = useArtworkStore((state) => state.selectedDate);

  const [visPopUpDelete, setVisPopUpDelete] = useState(false);

  //MAXARTWORKS PÅ VALGTE LOKATION
  const maxArtworks = selectedLocation?.maxArtworks ?? Infinity;

  const isSaved = gemteVaerker.some(
    (item) => item?.object_number === vaerk.object_number
  );

  //Er værket allerede udstillet samme dato?
  const isInSameDate = events.some((event) => {
    const usedInEvent = event.artworkIds?.includes(vaerk.object_number);
    const sameDate =
      selectedDate &&
      new Date(event.date).toDateString() ===
        new Date(selectedDate).toDateString();
    return usedInEvent && sameDate;
  });

  const isDisabled =
    !isSaved && (gemteVaerker.length >= maxArtworks || isInSameDate);

  //  vis popover når værket er valgt og udstillet på valgt dato
  useEffect(() => {
    if (isSaved && isInSameDate) {
      setVisPopUpDelete(true);
    } else {
      setVisPopUpDelete(false);
    }
  }, [selectedDate, isSaved, isInSameDate]);

  //vælg eller fravælg et værk
  const handleSavedToggle = () => {
    if (isSaved) {
      sletVaerk(vaerk.object_number);
    } else {
      addVaerk(vaerk);
    }
  };

  return (
    <div className="relative top-15 -left-20">
      <input
        className="w-5 h-5 cursor-pointer"
        type="checkbox"
        checked={isSaved}
        onChange={handleSavedToggle}
        disabled={isDisabled}
      />

      {visPopUpDelete && (
        <PopUP>
          Du har valgt et værk, der allerede er udstillet på den valgte dato.
          <br />
          Vil du slette {vaerk.titles?.[0]?.title || "ukendt titel"}?
          <div className="flex gap-5 mt-4">
            <PrimaryButton
              onClick={() => {
                sletVaerk(vaerk.object_number);
                setVisPopUpDelete(false);
              }}
            >
              Ja
            </PrimaryButton>
            <SecondaryButton onClick={() => setVisPopUpDelete(false)}>
              Nej
            </SecondaryButton>
          </div>
        </PopUP>
      )}
    </div>
  );
};

export default GemVaerk;
