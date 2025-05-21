"use client";

import useBookingStore from "@/store/bookingStore";
import { useState, useEffect } from "react";
import Link from "next/link";
import KurvCard from "./KurvCard";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";

const KurvPopover = ({ onClose, art }) => {
  const [isVisible, setIsVisible] = useState(false);

  const { billetter } = useBookingStore((state) => state);
  const billetSum = useBookingStore((state) => state.billetSum());
  const emptyKurv = useBookingStore((state) => state.emptyKurv);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Funktion til at lukke popover og informere Header
  const handleClose = () => {
    setIsVisible(false);
    // Vent på at animationen er færdig før vi informerer Header
    setTimeout(() => {
      if (onClose) onClose();
    }, 500); // Match transition duration
  };

  return (
    <div
      className={`px-10 pb-30 fixed right-0 w-full sm:w-2/3 lg:w-1/2 h-screen bg-(--white) shadow-lg z-1 transition-transform duration-500 ease-out flex flex-col
        ${isVisible ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Scrollbart indhold */}
      <div className="flex-1 overflow-y-auto">
        <div className="pb-16 pt-4">
          <p>Antal billetter til valgte arrangementer ({billetSum})</p>
          <hr />
        </div>

        {/* If/else statement som viser bestilt arrangement ellers besked om tom kurv */}
        <div className="flex-1">
          {billetter && billetter.length > 0 ? (
            billetter.map((billet) => (
              <KurvCard key={billet.id} event={billet} art={art} />
            ))
          ) : (
            <p>Der er ingen arrangementer tilføjet til kurven</p>
          )}
        </div>
      </div>

      {/* Knapper i bunden */}
      {billetter && billetter.length > 0 && (
        <div className="grid grid-cols-2 gap-8">
          <SecondaryButton
            onClick={() => {
              emptyKurv();
              handleClose(); // Luk og informer Header
            }}
          >
            Tøm kurv
          </SecondaryButton>

          <Link href="/ordreoversigt" onClick={handleClose}>
            <TertrieryButton>Bekræft billetter</TertrieryButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default KurvPopover;
