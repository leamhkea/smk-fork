"use client";

// Importerer store og components
import useBookingStore from "@/store/bookingStore";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";

const ButtonAddBillet = ({ billet }) => {
  const addBillet = useBookingStore((state) => state.addBillet);
  const updateAntal = useBookingStore((state) => state.incAntal);
  const billetter = useBookingStore((state) => state.billetter);

  const addToKurv = (billet) => {
    if (billetter.length) {
      const duplicate = billetter.find((el) => el.id === billet.id);
      console.log("duplicate? ", duplicate);
      if (duplicate) {
        updateAntal(billet.id);
      } else {
        addBillet({ ...billet, antal: 1 });
      }
    } else {
      addBillet({ ...billet, antal: 1 });
    }
  };

  return (
    <SecondaryButton onClick={() => addToKurv(billet)}>
      Book arrangement
    </SecondaryButton>
  );
};

export default ButtonAddBillet;
