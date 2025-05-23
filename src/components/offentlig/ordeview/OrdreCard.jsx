"use client";
import KurvCard from "../kurvview/KurvCard";
import useBookingStore from "@/store/bookingStore";
import FormOplysninger from "./FormOplysninger";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import Link from "next/link";

const OrdreCard = () => {
  // Indhentes fra bookingStore med brug zustand og state
  const { billetter } = useBookingStore((state) => state);
  const billetSum = useBookingStore((state) => state.billetSum());

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* ===================== KONTAKTOPLYSNINGER ====================== */}
      <div className="min-h-150 flex-1 bg-white px-6 py-10 shadow-md">
        <p>Kontaktoplysninger</p>
        <hr className="mb-12" />

        <FormOplysninger />
      </div>

      {/* ====================== BASKET INDHOLD ======================= */}
      {/* Order summary --> bliver sticky kun på større skærme */}
      <div className="min-h-150 flex-1 bg-white px-6 py-10 shadow-md">
        <p>Antal billetter ({billetSum})</p>
        <hr className="mb-12" />

        <div>
          {billetter && billetter.length > 0 ? (
            billetter.map((billet) => (
              <KurvCard key={billet.id} event={billet} />
            ))
          ) : (
            <p>Der er ingen arrangementer tilføjet til kurvet</p>
          )}
        </div>

        <Link href={`/ordrebekræftelse`}>
          <TertrieryButton>Bekræft booking</TertrieryButton>
        </Link>
      </div>
    </div>
  );
};

export default OrdreCard;
