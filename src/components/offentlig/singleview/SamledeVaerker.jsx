"use client";

// Import fra react og egne components
import VaerkPopup from "./VaerkPopup";
import Image from "next/image";
import { useRef, useState } from "react";
import { animate } from "motion";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

export default function SamledeVaerker({ event, art }) {
  // ref peger på scroll-containeren
  const ref = useRef(null);

  // useScroll fra motion/react giver scrollXProgress, som er en værdi fra 0 til 1 baseret på scroll-position
  const { scrollXProgress } = useScroll({ container: ref });

  // useScrollOverflowMask returnerer en CSS mask-image (en gradient-effekt), som ændrer sig afhængig af scrollposition
  const maskImage = useScrollOverflowMask(scrollXProgress);

  // Bruges til at styre hvilket værk, der er klikket på (herefter vises i popup)
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Finder alle de kunstværker i art, hvis object_number matcher event.artworkIds
  const matchedArtworks = event.artworkIds?.length
    ? art?.filter((artwork) => event.artworkIds.includes(artwork.object_number))
    : [];

  return (
    <div className="flex flex-col lg:flex-row lg:gap-12 justify-between mx-auto">
      {/* =========================== BESKRIVENDE TEKST TIL VÆRKER ========================== */}
      <div className="break-words self-center flex flex-col gap-4">
        <h2>Tilknyttede værker</h2>
        <p className="max-w-80">
          Her ses de tilknyttede værker til arrangementet.
        </p>
        <p className="max-w-80">
          Klik ind på værkerne for at læse mere om det enkelte værk.
        </p>
      </div>

      {/* ============================= ALLE TILKNYTTEDE VÆRKER ============================= */}
      <div className="mx-auto lg:max-w-200 md:max-w-150 sm:max-w-120 max-w-100 relative">
        {/* Scrollbar med motion.ul som får ref til tracking og en dynamisk maskImage (gradient) */}
        <motion.ul
          ref={ref}
          // Klassen overflow-x-scroll tillader scroll, mens maskImage skaber en fading effekt i kanterne
          style={{ maskImage }}
          className="flex list-none overflow-x-scroll m-0 gap-6"
        >
          {matchedArtworks.map((artwork) => (
            <li
              key={artwork.object_number}
              className="flex-none w-[300px] flex items-center cursor-pointer"
              // Klik aktiverer setSelectedArtwork og åbner popup
              onClick={() => setSelectedArtwork(artwork)}
            >
              {artwork?.image_thumbnail && (
                <Image
                  alt="artwork"
                  src={artwork.image_thumbnail}
                  width={100}
                  height={100}
                  className="object-contain w-full h-auto"
                />
              )}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* ========================== POPOVER FOR KLIKKEDE VÆRKERNE =========================== */}
      {selectedArtwork && (
        <VaerkPopup
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          event={event}
          art={art}
        />
      )}
    </div>
  );
}

// Disse konstanter bruges til at definere farve og position i masken:

// left og right = 0% og 100% → hele bredden
const left = `0%`;
const right = `100%`;

// leftInset og rightInset = 20% og 80% → en zone inde fra kanten
const leftInset = `20%`;
const rightInset = `80%`;

// Masker fungerer omvendt af, hvad man måske tror: sort (opaque) = synligt, gennemsigtig (transparent) = skjult
const transparent = `#0000`; // helt gennemsigtig
const opaque = `#000`; // helt sort (synligt i mask)

// Denne funktion styrer hvor maskeringen skal være
function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(getMask(0)); // Start med fade i højre side

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    const prev = scrollXProgress.getPrevious();
    if (value === 0) {
      animate(maskImage, getMask(0)); // venstreside fade
    } else if (value === 1) {
      animate(maskImage, getMask(1)); // højreside fade
    } else if (prev === 0 || prev === 1) {
      animate(maskImage, getMask(0.5)); // begge sider fade
    }
  });

  return maskImage;
}

// Returnerer CSS gradient-mask afhængig af position
function getMask(position) {
  if (position === 0) {
    // // Vi er scrollet helt til venstre – fade ud mod højre
    return `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`;
  }
  if (position === 1) {
    // // Vi er helt til højre – fade ind fra venstre
    return `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`;
  }
  // // Midt i scroll – fade begge sider
  return `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`;
}

// DOKUMENTATION / RESSOURCE:
// https://examples.motion.dev/react/scroll-container
