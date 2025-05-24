"use client";

import dynamic from "next/dynamic";

const OrdreCard = dynamic(
  () => import("@/components/offentlig/ordeview/OrdreCard"),
  {
    loading: () => <p>Loading...</p>, // Loading-indikator
    ssr: false, // Slår server-side rendering fra for denne komponent
  }
);

const OrdreOversigt = () => {
  return (
    <section>
      <OrdreCard />
    </section>
  );
};

export default OrdreOversigt;
