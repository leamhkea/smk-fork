"use client";
import { useEffect, useState } from "react";
import VaerkerListCard from "./VaerkerListCard";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";

const VaerkerListClient = ({ artData }) => {
  const {
    artworks,
    visibleArtworks,
    setArtworks,
    handleLoadMore,
    hasMore,
  } = useArtworkStore();

  //loading af knap
  const [loading, setLoading] = useState(false); 

  //useEffect bruges til at kalde funktionen manuelt, så zustand-store bliver fyldt med værker ved at kalde setArtWorks-funktionen eftersom artworks er tom ved første rendering
  useEffect(() => {
    if (artworks.length === 0 && artData.length > 0) { //sikrer at dataen, der loades og sendes som prop fra serversiden, bliver lagt i zustandstore, men kun én gang
      setArtworks(artData);
    }
  }, [artData]);

  return (
    <div className="flex flex-col gap-4 mt-0 mb-8">
      <div>
        <h1>Alle kunstværker</h1>
        <p>For neden ses kunstværker i Statens Museum for Kunsts arkiv.</p>
      </div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {visibleArtworks.map((art) => (
          <VaerkerListCard key={art.id} art={art} />
        ))}
      </ul>
      {hasMore() && ( //viser kun knappen hvis der er mere data at indhente
        <div>
          <SecondaryButton
            onClick={() => {
              setLoading(true); //knappen begynder at load hvis der er trykket, dernæst køres handleLoadMore-funktionen fra zustandstore, og sætter dernæst tilbage til false
              handleLoadMore();
              setLoading(false);
            }}
            disabled={loading}
          >
            {loading ? "Indlæser..." : "Vis flere"}
          </SecondaryButton>
        </div>
      )}
    </div>
  );
};

export default VaerkerListClient;
