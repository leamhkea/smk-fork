"use client";

// Importerer store og components
import useBookingStore from "@/store/bookingStore";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import { toast } from "react-toastify";

const ButtonAddBillet = ({ billet, art }) => {
  // Kalder på nødvendige funktioner fra store
  const { addBillet, incAntal, billetter } = useBookingStore();

  // Hvis billet.artworkIds findes, filtreres art-arrayet for at finde artworks med tilsvarende object_number
  const matchedArtworks = billet.artworkIds?.length
    ? art?.filter((artwork) =>
        billet.artworkIds.includes(artwork.object_number)
      )
    : [];

  // Laver const til at udregne antal ledige billetter
  const ledigeBilletter = billet.totalTickets - billet.bookedTickets;

  // Funktion til at tilføje billet til kurv
  const addToKurv = () => {
    const eksisterendeBillet = billetter.find((bln) => bln.id === billet.id);

    // Først: tjek om der overhovedet er nogen billetter tilbage
    if (ledigeBilletter === 0) {
      toast.error("Der er ikke flere ledige billetter til dette arrangement.");
      return;
    }

    // Hvis billetten allerede findes i kurven
    if (eksisterendeBillet) {
      if (eksisterendeBillet.antal < ledigeBilletter) {
        incAntal(billet.id);
        toast.success("En billet mere er tilføjet til kurven!");
      } else {
        toast.error(
          "Der er ikke flere ledige billetter til dette arrangement."
        );
      }
    } else {
      // Hvis billetten ikke findes i kurven, tilføjes den
      addBillet({ ...billet, antal: 1, matchedArtworks });
      toast.success("Billetten er tilføjet til kurven!");
    }
  };

  return (
    <SecondaryButton onClick={addToKurv}>
      Book billet til arrangement
    </SecondaryButton>
  );
};

export default ButtonAddBillet;
