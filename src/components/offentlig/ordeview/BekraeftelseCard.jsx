"use client";

import { useEffect } from "react";
import useBookingStore from "@/store/bookingStore";

const BekraeftelseCard = () => {
  // Billetter og emptykurv hentes for at kurven slettes ved bekræft booking
  const billetter = useBookingStore((state) => state.billetter);
  const billetSum = useBookingStore((state) => state.billetSum());

  // Henter kontaktoplysninger fra Zustand bekraeftelse-store
  const kontaktoplysninger = useBookingStore(
    (state) => state.kontaktoplysninger
  );

  // Nulstiller kontaktoplysningerne
  const resetKontaktoplysninger = useBookingStore(
    (state) => state.resetKontaktoplysninger
  );

  useEffect(() => {
    // Efter 10 sekunder kaldes resetKontaktoplysninger, som nulstiller data
    const timeout = setTimeout(() => {
      resetKontaktoplysninger();
    }, 1000000); // 10 sekunder

    // Hvis komponenten bliver unmounted inden de 10 sekunder, fjernes timeout'en for at undgå at forsøge at opdatere unmounted komponenter
    return () => clearTimeout(timeout);
  }, []);

  // Hvis der ikke findes et forNavn, antages det at der slet ikke er nogen kontaktoplysninger
  if (!kontaktoplysninger.forNavn) {
    return <p>Ingen kontaktoplysninger fundet.</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md">
      <h2 className="text-lg font-bold mb-4">Ordrebekræftelse</h2>
      <p>
        Tak for din booking, {kontaktoplysninger.forNavn}
        {kontaktoplysninger.efterNavn}!
      </p>
      <p>En bekræftelse er sendt til: {kontaktoplysninger.email}</p>
      <p>Vi kontakter dig på: {kontaktoplysninger.mobilNummer}</p>

      <hr className="my-4" />

      <p>Du har bestilt {billetSum} billetter til følgende arrangementer:</p>
      <ul>
        {billetter.map((billet) => (
          <li key={billet.id}>
            {billet.eventNavn} — {billet.antal} stk.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BekraeftelseCard;
