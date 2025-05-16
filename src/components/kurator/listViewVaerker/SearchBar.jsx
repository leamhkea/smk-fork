"use client";
import { useState } from "react";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import { searchArtworks } from "@/librery/artworkUtils";
//mangler at sørge for man kan bruge enter og nulstiller til søgninger når man søger tomt
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const setSearchResults = useArtworkStore((state) => state.setSearchResults);
  const setArtworks = useArtworkStore((state)=>state.setArtworks)
  const [loading, setLoading] = useState(false); 

  const handleSearch = async () => {
    setLoading(true);
    if (query.trim() === "") {
      // Nulstil søgeresultater hvis input er tomt
      setSearchResults([setArtworks]); //ændr senere noget med denne sætning, der gør at alle værker returneres når søgefeltet er tomt
      setLoading(false);
      return;
    }
    const results = await searchArtworks(query.trim());
    setSearchResults(results);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-3">
        <input
            type="text"
            placeholder="Søg værk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={async (e) => {
                if (e.key === "Enter") {
                setLoading(true);
                await handleSearch();
                setLoading(false);
                }
            }}
            className="flex-1 py-3 px-6 w-xl border bg-(--white) mt-5"
        />

      <div className="m-auto">
        <SecondaryButton
            onClick={async () => {
                setLoading(true);
                await handleSearch(); // await for at vente på at søgningen bliver færdig. opdater til kun at virke hvis det er mere end to sekunder??
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

