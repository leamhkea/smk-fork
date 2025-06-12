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
  const gemteVaerker = useArtworkStore((state)=>state.gemteVaerker);

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

  //VIS KUN GEMTE VÆRKER
  const [visKunValgte, setVisKunValgte] = useState(false)

  const visteVaerker = visKunValgte ? gemteVaerker : visibleArtworks;


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
        <div className="flex items-baseline gap-2 md:gap-10">
        <Filtrering artData={artData} />
            <div onClick={() => setVisKunValgte((prev) => !prev)}>
              <button className="hover:underline">
                {visKunValgte ? 'Vis alle værker' : 'Vis valgte værker'}
              </button>
            </div>
        </div>
        <hr />
      </div>

      <div className="grid grid-cols-[2fr_3fr] md:grid-cols-[2fr_5fr] h-screen overflow-hidden">
        <div className="min-h-full max-w-80 overflow-hidden p-4">
          <Inputs art={artData} events={events}>Opret arrangement</Inputs>
        </div>

        <div className="h-full overflow-y-auto">
          <div className="flex flex-col min-h-full px-4 pb-10">
          {visteVaerker.length >0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {visteVaerker.map((art) => (
                <VaerkerListCard
                  key={art.object_number}
                  events={events}
                  art={art}
                />
              ))}
            </ul>
            ):
            <div>
              <h3 className="text-gray-500 text-center p-10">Ingen kunstværker fundet</h3>
            </div>
            }
          </div>
        </div>
      </div>

            {hasMore(get, visKunValgte) && (
                <div className="flex justify-center">
                <div className="m-auto flex items-center">
                <PrimaryButton
                    onClick={() => {
                      loadMoreArtworks(get, set);
                    }}
                  >
                    Vis {visteVaerker.length} ud af {visKunValgte 
                      ? gemteVaerker.length 
                      : get().filteredArtworks.length > 0 
                        ? get().filteredArtworks.length 
                        : get().artworks.length
                    } værker
                  </PrimaryButton>
                  </div>
                  </div>
            )}
    </div>
  );
};

export default VaerkerListClient;
