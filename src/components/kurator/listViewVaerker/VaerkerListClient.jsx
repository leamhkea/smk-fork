"use client";
import VaerkerListCard from "./VaerkerListCard";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import { useState, useEffect } from "react";

const VaerkerListClient = ({ artData }) => {
  const [loading, setLoading] = useState(false);
  // const { visFlere } = useArtworkStore((state) => ({
  //   visFlere: state.visFlere,
  // }));

  return (
    <div className="flex flex-col gap-4 mt-0 mb-8">
      <div>
        <h1>Alle kunstværker</h1>
        <p>For neden ses alle kunstværker i Statens Museum for Kunsts arkiv.</p>
      </div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {artData.map((art) => (
          <VaerkerListCard key={art.id} art={art} />
        ))}
      </ul>
      <div>
        <SecondaryButton onClick={setLoading} disabled={loading}>
          {loading ? "Indlæser..." : "Vis flere"}
        </SecondaryButton>
      </div>
    </div>
  );
};

export default VaerkerListClient;
