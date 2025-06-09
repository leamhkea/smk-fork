"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import { useEffect, useState } from "react";

const VaerkPopup = ({ artwork, onClose }) => {
  // Gemmer alle arrangementer (events), der hentes fra serveren. Starter som en tom liste []
  const [allEvents, setAllEvents] = useState([]);

  // Gemmer de arrangementer, der er relateret til det aktuelle artwork. Starter også som tom liste
  const [relatedEvents, setRelatedEvents] = useState([]);

  // useEffect bliver slet ikke kørt på serversiden, men først efter komponenten er monteret i browseren
  useEffect(() => {
    async function fetchEvents() {
      // Henter data fra API'et
      const alleEvents = await fetch(
        "https://async-exhibit-server-rmug.onrender.com/events"
      );

      // Sætter allEvents state til den hentede data
      const data = await alleEvents.json();
      setAllEvents(data);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    // Tjekker om der er hentet nogle events og om er der et valgt kunstværk
    if (allEvents.length > 0 && artwork) {
      // Hvis ja, laver den en filtrering. Går alle events igennem og finder kun dem, som indeholder det valgte kunstværks
      const filtered = allEvents.filter((event) =>
        event.artworkIds?.includes(artwork.object_number)
      );
      // Resultatet gemmes i relatedEvents state
      setRelatedEvents(filtered);
    }
  }, [allEvents, artwork]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-1 flex justify-center items-center">
      <motion.div
        className="bg-(--white) p-10 shadow-md max-w-220 w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================== DET TILKNYTTEDE VÆRK ========================== */}

        {artwork?.image_thumbnail && (
          <Image
            alt="Artwork thumbnail"
            src={artwork.image_thumbnail}
            width={200}
            height={200}
            className="object-contain m-auto pb-4"
          />
        )}

        {/* ========================== INFORMATION OM VÆRKET ========================= */}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <div>
            <h3 className="text-center pb-2">{artwork.titles?.[0]?.title}</h3>
            <p>
              Kunstneren <span className="px-1">{artwork.artist}</span>
              krearede kunstværket d.
              <span className="pl-1">{artwork.acquisition_date_precision}</span>
              .
            </p>
            <p>
              Kunstværkets type er et
              <span className="px-1">{artwork.object_names[0]?.name}</span>
              og findes i afdelingen
              <span className="pl-1">{artwork.responsible_department}</span>.
            </p>
          </div>

          {/* ========================= EVENTs VÆRKET INDGÅR I ======================== */}
          <div>
            <h3 className="text-center pb-2">Arrangementer værket indgår i</h3>
            {relatedEvents.length === 0 ? (
              <p>Ingen arrangementer fundet</p>
            ) : (
              <ul>
                {relatedEvents.map((event) => (
                  <li key={event.id} className="grid grid-cols-2 gap-6">
                    <span className="text-end">{event.title}</span>
                    <span>{event.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ============================= LUK POPOVER BUTTON =========================== */}
        <SecondaryButton onClick={onClose}>Luk</SecondaryButton>
      </motion.div>
    </div>
  );
};

export default VaerkPopup;
