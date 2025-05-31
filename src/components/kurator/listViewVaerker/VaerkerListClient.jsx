"use client";
import { useEffect, useState } from "react";
import VaerkerListCard from "./VaerkerListCard";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import Filtrering from "./Filtrering";
import SearchBar from "./SearchBar";
import Inputs from "../opretArrangementer/Inputs";
import GoBackArrow from "@/components/global/buttons/GoBackArrow";
import { loadMoreArtworks, setArtworks,
  hasMore, } from "@/store/artworkUtils";

const VaerkerListClient = ({ artData, events }) => {
  const get = useArtworkStore.getState;
  const set = useArtworkStore.setState;

  const { artworks, visibleArtworks } = useArtworkStore();
  const updatePublishedEvents = useArtworkStore((state) => state.updatePublishedEvents);
  const selectedDate = useArtworkStore((state) => state.selectedDate);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (artworks.length === 0 && artData.length > 0) {
      setArtworks(set, artData);
    }
  }, [artData]);

  useEffect(() => {
    if (events?.length) {
      updatePublishedEvents(events);
    }
  }, [events]);

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

            {hasMore(get) && (
              <div className="flex mt-8 m-auto justify-center">
                <SecondaryButton
                  onClick={() => {
                    setLoading(true);
                    loadMoreArtworks(get, set);
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
