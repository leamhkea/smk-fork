"use client";

// Imports udefra
import * as motion from "motion/react-client";
import { useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import React, { useMemo } from "react";
import { CgArrowLongLeft } from "react-icons/cg";
import Link from "next/link";

// Imports egne components
import useBookingStore from "@/store/bookingStore";
import KurvCard from "../kurvview/KurvCard";

const BekraeftelseCard = () => {
  // Sørger for, at confetti dækker hele viewet
  const { width, height } = useWindowSize();

  // Indhenter den state af billetter som var bestilt i kurven og laver en ny (da kurv blev tømt)
  const billetter = useBookingStore((state) => state.bekraeftelsesBilletter);

  // Indhenter kontaktoplysninger fra FormOplysninger, som blev sendt til Zustand
  const kontaktoplysninger = useBookingStore(
    (state) => state.bekraeftelsesKontaktoplysninger
  );

  // Resetter alle felterne i form
  const resetKontaktoplysninger = useBookingStore(
    (state) => state.resetKontaktoplysninger
  );

  // Laver et random 8 cifret nummer (useMemo gemmer (memoizer) resultatet af en beregning, så den ikke udføres igen ved hver render)
  const random8DigitNumber = useMemo(() => {
    // Starter med en tom streng
    let number = "";

    // Tilføjer 8 cifre til number – én gang for hvert ciffer der genereres
    for (let randomNumber = 0; randomNumber < 8; randomNumber++) {
      // number +=          = tilføjer det nye ciffer til slutningen af strengen
      // Math.floor(...)    = fjerner decimalerne og giver et heltal mellem 0 og 9
      // Math.random() * 10 = laver decimaltal mellem 0 og 9.999
      number += Math.floor(Math.random() * 10);
    }
    return number;
  }, []);

  // Sætter en timer, så oplysningerne bliver hentet inden de ryddes
  useEffect(() => {
    const timeout = setTimeout(() => {
      resetKontaktoplysninger();
    }, 10000); // 10 sekunder

    return () => clearTimeout(timeout);
  }, [resetKontaktoplysninger]);

  // Laver en if statement, hvis kontaktoplysninger ikke blev sendt videre
  if (!kontaktoplysninger || !kontaktoplysninger.forNavn) {
    return <p>Ingen kontaktoplysninger fundet.</p>;
  }

  return (
    <div>
      <Link href="/arrangementer">
        {/* <div className="pl-5 pb-5 hover:scale-105 transition-all duration-300">
          <CgArrowLongLeft size={40}/>
        </div> */}
      </Link>
      {/* ======================= CONFETTI EFFEKT PÅ HELE VIEWET ========================= */}
      <Confetti width={width} height={height} />

      {/* ======================== MOTION ANIMATION AF INDHOLDET ========================= */}
      <motion.div
        className="grid relative"
        initial={{ opacity: 0.1, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 1, bounce: 0.2 },
        }}
      >
        {/* ================= FORMOPLYSNING INFORMATIONEN SENDT VIDERE =================== */}
        <div className="flex flex-col items-center gap-6">
          <h1>Ordrebekræftelse</h1>

          <p>
            Tak for din booking,
            <span className="text-(--blue) px-1">
              {kontaktoplysninger.forNavn}
            </span>
            <span className="text-(--blue)">
              {kontaktoplysninger.efterNavn}
            </span>
            !
          </p>

          <p>
            Bekræftelsen på din ordre er sendt til:
            <span className="text-(--blue) px-1">
              {kontaktoplysninger.email}.
            </span>
          </p>

          <p>
            Ved yderligere opdateringer for arrangementet kontakter dig på:
            <span className="text-(--blue) px-1">
              {kontaktoplysninger.mobilNummer}.
            </span>
          </p>

          <p>
            Her er dit ordrenummer, som vises ved fremmøde:
            <span className="text-(--blue) px-1">{random8DigitNumber}.</span>
          </p>

          {/* =================== KURV CARD ARRANGEMENT OG ANTAL BILLETTER ================= */}
          <div className="mt-16">
            {billetter.map((billet) => (
              <KurvCard key={billet.id} event={billet} undtagelser={true} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BekraeftelseCard;
