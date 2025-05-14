"use client";
import KurvCard from "@/components/global/kurv/KurvCard";
import useBookingStore from "@/store/bookingStore";

const OrdreCard = () => {
  // Indhentes fra bookingStore med brug zustand og state
  const { billetter } = useBookingStore((state) => state);
  const billetSum = useBookingStore((state) => state.billetSum());

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Basket-indholdet */}
      <div className="flex-1 bg-white px-6 py-10 shadow-md flex flex-col min-h-100">
        Indhold
      </div>

      {/* Order summary --> bliver sticky kun på større skærme */}
      <div className="grid gap-10 min-h-100 w-full lg:w-1/2 bg-white px-6 py-10 shadow-md md:sticky md:top-20 md:self-start">
        <p>Antal billetter til valgte arrangementer ({billetSum})</p>

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
    </div>
  );
};

export default OrdreCard;
