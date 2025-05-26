"use client";

import dynamic from "next/dynamic";

const BekraeftelseCard = dynamic(
  () => import("@/components/offentlig/ordeview/BekraeftelseCard"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export default function OrdreBekraeftelse() {
  return (
    <section>
      <BekraeftelseCard />
    </section>
  );
}
