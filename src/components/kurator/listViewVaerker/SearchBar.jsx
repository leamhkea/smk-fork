"use client";
import { useState } from "react";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import { searchArtworks } from "@/librery/artworkUtils";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const setSearchResults = useArtworkStore((state) => state.setSearchResults);
  const [loading, setLoading] = useState(false); 
  const resetToInitial = useArtworkStore((state) => state.resetToInitial);

  const handleSearch = async () => {
    setLoading(true);
    if (query.trim() === "") {
      // Returner standard søgeresultater hvis input er tomt
      resetToInitial(); 
      setLoading(false); //resetter loading
      return;
    }

    const results = await searchArtworks(query.trim()); //kører søgeresultatet først når handleSearch er gennemført
    setSearchResults(results);
    setLoading(false); //resetter loading
  };

  return (
    <div className="flex items-center gap-3">
        <input
            type="text"
            placeholder="Søg værk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={async (e) => { //gør det muligt at søge med enter
                if (e.key === "Enter") {
                setLoading(true);
                await handleSearch(); // await for at vente på at søgningen bliver færdig.
                setLoading(false);
                }
            }}
            className="flex-1 py-3 px-6 w-xl border bg-(--white) mt-5"
        />

      <div className="m-auto">
        <SecondaryButton
            onClick={async () => {
                setLoading(true);
                await handleSearch(); // await for at vente på at søgningen bliver færdig.
                setLoading(false);
            }}
            disabled={loading}
            >
            {loading ? "søger..." : "søg"}
    </SecondaryButton>
      </div>
    </div>
  );
};

export default SearchBar;


//DOKUMENTATION BRUGT

//hvornår bruges await
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

//on KeyDown vanilla eksempel for forståelse
//https://stackoverflow.com/questions/44228386/javascript-onkeydown-code-to-clear-text-value-from-search-box-not-working-in-moz

