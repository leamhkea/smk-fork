"use client";
//import af egne komponenter
import VaerkerListCard from "./VaerkerListCard";
import PrimaryButton from "@/components/global/buttons/PrimaryButton";
import useArtworkStore from "@/store/kuratorStore";
import GoBackArrow from "@/components/global/buttons/GoBackArrow";
import { loadMoreArtworks, setArtworks, hasMore, } from "@/store/artworkUtils";
import Filtrering from "./Filtrering";

import SearchBar from "./SearchBar";

import Inputs from "../opretArrangement/Inputs";


//imports udefra
import { useEffect, useState } from "react";

const VaerkerListClient = ({ artData, events }) => {
  //zustand import
  const get = useArtworkStore.getState;
  const set = useArtworkStore.setState;
  const { artworks, visibleArtworks } = useArtworkStore();
  const updatePublishedEvents = useArtworkStore((state) => state.updatePublishedEvents);
  const selectedDate = useArtworkStore((state) => state.selectedDate);

  //useState
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (artworks.length === 0 && artData.length > 0) {
      setArtworks(set, artData);
    }
  }, [artData]); //tilføjer data-sorteringen fra utils af artworks

  useEffect(() => {
    if (events?.length) {
      updatePublishedEvents(events);
    }
  }, [events]); //setter published events efter get-requesten

  return (
    <div className="flex flex-col gap-4 mt-0 mb-8">
      <GoBackArrow />
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

      <div className="grid grid-cols-[2fr_3fr] md:grid-cols-[2fr_5fr] h-screen overflow-hidden">
        <div className="min-h-full max-w-80 overflow-y-auto p-4">
          <Inputs art={artData} events={events}>Opret arrangement</Inputs>
        </div>

        <div className="h-full overflow-y-auto">
          <div className="flex flex-col min-h-full px-4 py-6">
            
            {/* fejlmeddelelse til hvis brugeren ikke har valgt dato endnu */}
            {!selectedDate && (
              <p className="text-red-500 mt-1 pl-5">
                Du skal vælge en dato før du kan vælge et kunstværk.
              </p>
            )}

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {visibleArtworks.map((art) => (
                <VaerkerListCard
                  key={art.object_number}
                  events={events}
                  art={art}
                />
              ))}
            </ul>

            {/* viser herunder kun knappen hvis der er flere værker at indlæse ellers display none */}
            {hasMore(get) && (
              <div className="flex mt-8 m-auto justify-center">
                <PrimaryButton
                  onClick={() => {
                    setLoading(true);
                    loadMoreArtworks(get, set);
                    setLoading(false);
                  }}
                  disabled={loading}
                >
                  {loading ? "Indlæser værker..." : "Vis flere værker"}
                </PrimaryButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaerkerListClient;
