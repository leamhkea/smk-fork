import useArtworkStore from "@/store/kuratorStore";
import Kladder from "./Kladder";
import { useEffect, useState } from "react";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";

const ListKladder = ({ art }) => {
  const { savedEvents } = useArtworkStore();
  const [hydrated, setHydrated] = useState(false);
  const kladdeSum = useArtworkStore((state) => state.kladdeSum());

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const kladderMedVaerker = savedEvents
    .map((event) => {
      const matchingVaerk = art.find(
        (vaerk) => vaerk.object_number === event.inventarnummer?.[0]
      );
      return matchingVaerk
        ? { ...event, matchedVaerk: matchingVaerk }
        : null;
    })
    .filter(Boolean);

  return (
    <div className="px-4 mb-10">
      <div className="flex justify-between item-center">
          <h2>Mine kladder</h2> {/* opdater evt med sum */}
          <div> 
            <SecondaryButton>Opret arrangement</SecondaryButton>
          </div>
      </div>

      {kladderMedVaerker.length > 0 ? (
        kladderMedVaerker.map((event) => (
          <ul>
          <Kladder
            key={event.id || event.titel}
            event={event}
            vaerk={event.matchedVaerk}
          />
          </ul>
        ))
      ) : (
        <p className="text-gray-500 italic text-center p-10">Du har ingen gemte kladder.</p>
      )}
      <hr />
    </div>
  );
};

export default ListKladder;
