// "use client";

// import useBookingStore from "@/store/bookingStore";
// import SecondaryButton from "@/components/global/buttons/SecondaryButton";

// const ButtonAddBillet = ({ billet, art }) => {
//   const addBillet = useBookingStore((state) => state.addBillet);
//   const updateAntal = useBookingStore((state) => state.incAntal);
//   const billetter = useBookingStore((state) => state.billetter);

//   // Beholder den oprindelige logik for at matche artworks
//   const matchedArtworks = billet.artworkIds?.length
//     ? art?.filter((artwork) =>
//         billet.artworkIds.includes(artwork.object_number)
//       )
//     : [];

//   // Tilføj matchedArtworks til billet-objektet
//   const addToKurv = () => {
//     const billetMedArtworks = {
//       ...billet,
//       antal: 1,
//       matchedArtworks, // Vi sender matchedArtworks videre til kurven
//     };

//     const eksisterer = billetter.find((el) => el.id === billet.id);

//     if (eksisterer) {
//       updateAntal(billet.id);
//     } else {
//       addBillet(billetMedArtworks);
//     }
//   };

//   return (
//     <SecondaryButton onClick={addToKurv}>Book arrangement</SecondaryButton>
//   );
// };

// export default ButtonAddBillet;

"use client";

// Importerer store og components
import useBookingStore from "@/store/bookingStore";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";

const ButtonAddBillet = ({ billet, art }) => {
  const addBillet = useBookingStore((state) => state.addBillet);
  const updateAntal = useBookingStore((state) => state.incAntal);
  const billetter = useBookingStore((state) => state.billetter);

  const matchedArtworks = billet.artworkIds?.length
    ? art?.filter((artwork) =>
        billet.artworkIds.includes(artwork.object_number)
      )
    : [];

  const addToKurv = (billet) => {
    if (billetter.length) {
      const duplicate = billetter.find((el) => el.id === billet.id);
      console.log("duplicate? ", duplicate);
      if (duplicate) {
        updateAntal(billet.id);
      } else {
        addBillet({ ...billet, antal: 1, matchedArtworks });
      }
    } else {
      addBillet({ ...billet, antal: 1, matchedArtworks });
    }
  };

  return (
    <SecondaryButton onClick={() => addToKurv(billet)}>
      Book arrangement
    </SecondaryButton>
  );
};

export default ButtonAddBillet;
