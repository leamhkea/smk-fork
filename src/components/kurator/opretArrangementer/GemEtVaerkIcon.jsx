"use client";
import useArtworkStore from "@/store/kuratorStore";

const GemEtVaerkIcon = ({ vaerk, events }) => {
  const gemteVaerker = useArtworkStore((state) => state.gemteVaerker);
  const addVaerk = useArtworkStore((state) => state.addVaerk);
  const sletVaerk = useArtworkStore((state) => state.sletVaerk);
  const selectedLocation = useArtworkStore((state) => state.selectedLocation);
  const selectedDate = useArtworkStore((state) => state.selectedDate);

  //MAXARTWORKS PÅ VALGT LOKATION//
  const maxArtworks = selectedLocation?.maxArtworks ?? Infinity;

  const isSaved = gemteVaerker.some(
    (item) => item?.object_number === vaerk.object_number
  );

  //ER ARTWORK ALLEREDE UDSTILLET DEN DATO?//
  const isInSameDate = events.some((event) => {
    const usedInEvent = event.artworkIds?.includes(vaerk.object_number);

    const sameDate =
      selectedDate &&
      new Date(event.date).toDateString() ===
        new Date(selectedDate).toDateString(); //sørger for den er en Date og konverterer til en string

    return usedInEvent && sameDate;
  });

      const isDisabled =
      !selectedDate || // forhindrer valg hvis dato ikke er valgt
      (!isSaved && gemteVaerker.length >= maxArtworks) || 
      isInSameDate;


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
        className="w-5 h-5"
        type="checkbox"
        checked={isSaved} // styret af Zustand. Uden denne syntaks af checkbox, vil den altid vælge første item som checked
        onChange={handleSavedToggle}
        disabled={isDisabled}
      />
    </div>
  );
};

export default GemEtVaerkIcon;
