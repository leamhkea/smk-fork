"use client";

// Importerer store og components
import useBookingStore from "@/store/bookingStore";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";

const ButtonAddBillet = ({ billet, art }) => {
  // Kalder på nødvendige funktioner fra store
  const { addBillet, incAntal: updateAntal, billetter } = useBookingStore();

  // Hvis billet.artworkIds findes, filtreres art-arrayet for at finde artworks med tilsvarende object_number
  const matchedArtworks = billet.artworkIds?.length
    ? art?.filter((artwork) =>
        billet.artworkIds.includes(artwork.object_number)
      )
    : [];

  // Funktion til at tilføje billet til kurv
  const addToKurv = (billet) => {
    // Tjekker først, om der allerede er billetter i kurven
    if (billetter.length) {
      // Tjekker om den specifikke billet findes baseret på id
      const duplicate = billetter.find((el) => el.id === billet.id);

      // Hvis   = Kalder funktionen updateAntal med billetens id og øger antallet (antal) af den billet i kurven.
      if (duplicate) {
        updateAntal(billet.id);

        // Ellers = Tilføjes den nye billet til kurven med et antal sat til 1
      } else {
        addBillet({ ...billet, antal: 1, matchedArtworks });
      }

      // Hvis kurven er tom tilføjes billet til kurven direkte med antal sat til 1 og med matchedArtworks
    } else {
      addBillet({ ...billet, antal: 1, matchedArtworks });
    }
  };

  return (
    <SecondaryButton onClick={() => addToKurv(billet)}>
      Book billet til arrangement
    </SecondaryButton>
  );
};

export default ButtonAddBillet;
