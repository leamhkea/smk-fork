"use client";

// Import fra react og egne components
import dynamic from "next/dynamic";

const SamledeVaerker = dynamic(() => import("./SamledeVaerker"), {
  ssr: false, // Kun client-side
  loading: () => null, // Evt. vis en spinner hvis ønsket
});
const PraktiskInfo = dynamic(() => import("./PraktiskInfo"), {
  ssr: false, // Kun client-side
  loading: () => null, // Evt. vis en spinner hvis ønsket
});
const BeskrivendeTekst = dynamic(() => import("./BeskrivendeTekst"), {
  ssr: false, // Kun client-side
  loading: () => null, // Evt. vis en spinner hvis ønsket
});
const HeroImgText = dynamic(() => import("./HeroImgText"), {
  ssr: false, // Kun client-side
  loading: () => null, // Evt. vis en spinner hvis ønsket
});

import GoBackArrow from "@/components/global/buttons/GoBackArrow";
import ButtonAddBillet from "./ButtonAddBillet";

const SingleCard = ({ event, art }) => {
  return (
    <div>
      <GoBackArrow />
      <article className="grid gap-20">
        {/* =================== IMAGE + OVERSKRIFT ==================== */}
        <HeroImgText event={event} art={art} />

        {/* ===================== OM ARRANGEMENT ====================== */}
        <BeskrivendeTekst event={event} art={art} />

        {/* ================== TILFØJ EVENT TIL KURV ================== */}
        <div className="m-auto">
          <ButtonAddBillet billet={event} art={art} antal={event.antal} />
        </div>

        {/* ================== PRAKTISK INFORMATION =================== */}
        <PraktiskInfo event={event} />

        {/* ===================== SAMLEDE VÆRKER ====================== */}
        <SamledeVaerker event={event} art={art} />
      </article>
    </div>
  );
};

export default SingleCard;
