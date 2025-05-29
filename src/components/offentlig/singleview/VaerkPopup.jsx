"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";

const VaerkPopup = ({ artwork, onClose, event }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-1 flex justify-center items-center">
      <motion.div
        className="bg-(--white) p-10 shadow-md max-w-xl w-full"
        // style={{
        //   backgroundColor: artwork.suggested_bg_color?.[0] || "#ffffff",
        // }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================== DET TILKNYTTEDE VÆRK ========================== */}
        <div className="flex flex-col gap-8 mx-auto">
          <div className="self-center">
            {artwork?.image_thumbnail && (
              <Image
                alt="Artwork thumbnail"
                src={artwork.image_thumbnail}
                width={200}
                height={200}
                className="object-contain w-full h-auto"
              />
            )}
          </div>

          {/* ============================= TITEL PÅ VÆRKET ============================ */}
          <h3 className="text-center">{artwork.titles?.[0]?.title}</h3>

          {/* ========================== INFORMATION OM VÆRKET ========================= */}
          <div className="grid gap-4">
            <p>
              Kunstneren
              <span className="text-(--blue) px-1">{artwork.artist}</span>
              krearede kunstværket d.
              <span className="text-(--blue) pl-1">
                {artwork.acquisition_date_precision}
              </span>
              .
            </p>
            <p>
              Kunstværkets type er et
              <span className="text-(--blue) px-1">
                {artwork.object_names[0]?.name}
              </span>
              og findes i afdelingen
              <span className="text-(--blue) pl-1">
                {artwork.responsible_department}
              </span>
              .
            </p>

            {/* ========================= EVENT VÆRKET INDGÅR I ========================= */}
            {event.artworkIds?.includes(artwork.object_number) && (
              <p>
                Dette værk er en del af arrangementet:
                <span className="text-(--blue) pl-1">
                  {event.title || event.name}
                </span>
                .
              </p>
            )}
          </div>

          {/* ============================= LUK POPOVER BUTTON =========================== */}
          <TertrieryButton onClick={onClose}>Luk</TertrieryButton>
        </div>
      </motion.div>
    </div>
  );
};

export default VaerkPopup;
