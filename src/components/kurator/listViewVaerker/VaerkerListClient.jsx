"use client";
import { useEffect, useState } from "react";
import VaerkerListCard from "./VaerkerListCard";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import Filtrering from "./Filtrering";
import SearchBar from "./SearchBar";
import Inputs from "../opretArrangementer/Inputs";

const VaerkerListClient = ({ artData, events }) => {
  const { artworks, visibleArtworks, setArtworks, handleLoadMore, hasMore } =
    useArtworkStore();

  //loading af knap
  const [loading, setLoading] = useState(false);

  //useEffect bruges til at kalde funktionen manuelt, så zustand-store bliver fyldt med værker ved at kalde setArtWorks-funktionen eftersom artworks er tom ved første rendering
  useEffect(() => {
    if (artworks.length === 0 && artData.length > 0) {
      //sikrer at dataen, der loades og sendes som prop fra serversiden, bliver lagt i zustandstore, men kun én gang
      setArtworks(artData);
    }
  }, [artData]);

  return (
    <div className="flex flex-col gap-4 mt-0 mb-8">
      <div className="flex justify-between md:flex-row flex-col">
        <div>
          <h1>Alle kunstværker</h1>
          <p>For neden ses kunstværker i Statens Museum for Kunsts arkiv.</p>
        </div>

        <div>
          <SearchBar />
        </div>
      </div>

      <div className="mt-10">
        <Filtrering artData={artData} />
        <hr />
      </div>

      <div className="grid grid-cols-[2fr_5fr] h-screen overflow-hidden">
        {/* Venstre kolonne */}
        <div className="min-h-full max-w-80 overflow-y-auto p-4">
          <Inputs art={artData} events={events}>
            Opret arrangement
          </Inputs>
        </div>

        {/* Højre kolonne */}
        <div className="h-full overflow-y-auto">
          <div className="flex flex-col min-h-full px-4 py-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {visibleArtworks.map((art) => (
                <VaerkerListCard
                  key={art.object_number}
                  events={events}
                  art={art}
                />
              ))}
            </ul>

            {hasMore() && (
              <div className="flex mt-8 m-auto justify-center">
                <SecondaryButton
                  onClick={() => {
                    setLoading(true);
                    handleLoadMore();
                    setLoading(false);
                  }}
                  disabled={loading}
                >
                  {loading ? "Indlæser værker..." : "Vis flere værker"}
                </SecondaryButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaerkerListClient;
