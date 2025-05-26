"use client";
import useArtworkStore from "@/store/kuratorStore";


const GemEtVaerkIcon = ({ vaerk, events }) => {
  const gemteVaerker = useArtworkStore((state) => state.gemteVaerker);
  const addVaerk = useArtworkStore((state) => state.addVaerk);
  const sletVaerk = useArtworkStore((state) => state.sletVaerk);
  const selectedLocation = useArtworkStore((state) => state.selectedLocation);

  //MAXARTWORKS PÅ VALGT LOKATION//
  const maxArtworks = selectedLocation?.maxArtworks ?? Infinity;

  const isSaved = gemteVaerker.some(
    (item) => item?.object_number === vaerk.object_number
  );

  //ER ARTWORK ALLEREDE UDSTILLET PÅ DEN LOKATION?//
  const isInAnotherLocation = events.some((event) => {
    const locationId = event.location?.id;
    const isSameLocation = selectedLocation?.id === locationId;
  
    const usedInEvent = event.artworkIds?.includes(vaerk.object_number);
  
    return usedInEvent && isSameLocation; // Bruges i anden lokation
  });
  
  const isDisabled =
  (!isSaved && gemteVaerker.length >= maxArtworks) || isInAnotherLocation;

  
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
        checked={isSaved}          // styret af Zustand. Uden denne syntaks af checkbox, vil den altid vælge første item som checked
        onChange={handleSavedToggle} // toggle-funktion
        disabled={isDisabled}
      />
    </div>
  );
};

export default GemEtVaerkIcon;
