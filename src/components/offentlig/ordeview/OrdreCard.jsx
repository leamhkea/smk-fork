"use client";
import KurvCard from "../kurvview/KurvCard";
import useBookingStore from "@/store/bookingStore";
import FormOplysninger from "./FormOplysninger";

const OrdreCard = () => {
  // Indhentes fra bookingStore med brug zustand og state
  const { billetter } = useBookingStore((state) => state);
  const billetSum = useBookingStore((state) => state.billetSum());

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* ====================== BASKET INDHOLD ======================= */}
      {/* Order summary --> bliver sticky kun på større skærme */}
      <div className="min-h-150 flex-1 bg-white px-6 py-10 shadow-md">
        <p>Antal billetter ({billetSum})</p>
        <hr className="mb-12" />

        <div>
          {billetter && billetter.length > 0 ? (
            billetter.map((billet) => (
              <KurvCard key={billet.id} event={billet} />
            ))
          ) : (
            <p>Der er ingen arrangementer tilføjet til kurvet</p>
          )}
        </div>
      </div>

      {/* ===================== KONTAKTOPLYSNINGER ====================== */}
      <div className="min-h-150 flex-1 bg-white px-6 py-10 shadow-md flex flex-col justify-between">
        <p>Kontaktoplysninger</p>
        <hr className="mb-12" />

        <FormOplysninger className="h-full" />
      </div>
    </div>
  );
};

export default OrdreCard;
