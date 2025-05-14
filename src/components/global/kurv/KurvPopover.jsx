"use client";

// Importerer store og pakker fra react
import useBookingStore from "@/store/bookingStore";
import { useState, useEffect } from "react";
import Link from "next/link";

// Importerer vores egne Components
import KurvCard from "./KurvCard";
import SecondaryButton from "../buttons/SecondaryButton";
import TertrieryButton from "../buttons/TertrieryButton";

// HERUNDER STARTER KURVPOPOVER
const KurvPopover = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Indhentes fra bookingStore med brug zustand og state
  const { billetter } = useBookingStore((state) => state);
  const billetSum = useBookingStore((state) => state.billetSum());
  const emptyKurv = useBookingStore((state) => state.emptyKurv);

  // Når popover vises, opdateres animationen
  useEffect(() => {
    setIsVisible(true);
  }, []); // kører kun én gang, når komponenten mountes

  return (
    <div
      className={`fixed top-20 right-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 min-h-screen bg-(--white) shadow-lg z-1 transition-transform duration-500 ease-out 
      ${isVisible ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-10 overflow-y-auto grid gap-8">
        {/* Viser antallet af billetter tilføjet til kurven */}
        <p>Arrangementer ({billetSum})</p>

        {/* If/else statement som viser bestilt arrangement ellers besked om tom kurv */}
        <div className="flex-1">
          {billetter && billetter.length > 0 ? (
            billetter.map((billet) => (
              <KurvCard key={billet.id} event={billet} />
            ))
          ) : (
            <p>Der er ingen arrangementer tilføjet til kurvet</p>
          )}
        </div>
      </div>

      <div className="flex px-8 gap-8">
        {/* Button som tømmer kurven helt for arrangementer */}
        <SecondaryButton onClick={emptyKurv}>Tøm kurv</SecondaryButton>

        {/* Button til at bekræfte billetter og gå til ordreoversigt */}
        <TertrieryButton>
          <Link href="/ordreoversigt">Bekræft billetter</Link>
        </TertrieryButton>
      </div>
    </div>
  );
};

export default KurvPopover;
