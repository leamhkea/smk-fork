"use client";

import { useEffect } from "react";
import useBookingStore from "@/store/bookingStore";
import KurvCard from "../kurvview/KurvCard"; // Sørg for at stien passer

const BekraeftelseCard = () => {
  const billetter = useBookingStore((state) => state.bekraeftelsesBilletter);
  const kontaktoplysninger = useBookingStore(
    (state) => state.bekraeftelsesKontaktoplysninger
  );
  const resetKontaktoplysninger = useBookingStore(
    (state) => state.resetKontaktoplysninger
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      resetKontaktoplysninger();
    }, 10000); // 10 sekunder

    return () => clearTimeout(timeout);
  }, [resetKontaktoplysninger]);

  const billetSum = billetter.reduce((acc, billet) => acc + billet.antal, 0);

  if (!kontaktoplysninger.forNavn) {
    return <p>Ingen kontaktoplysninger fundet.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-20">
      <div className="flex flex-col items-center gap-4">
        <h2>Ordrebekræftelse</h2>
        <p>
          Tak for din booking, {kontaktoplysninger.forNavn}
          {kontaktoplysninger.efterNavn}!
        </p>
        <p>En baekræftelse er sendt til: {kontaktoplysninger.email}</p>
        <p>Vi kontakter dig på: {kontaktoplysninger.mobilNummer}</p>
        <p>Du har bestilt {billetSum} billetter til følgende arrangementer:</p>
      </div>

      <div>
        {billetter.map((billet) => (
          <KurvCard key={billet.id} event={billet} undtagelser={true} />
        ))}
      </div>
    </div>
  );
};

export default BekraeftelseCard;
