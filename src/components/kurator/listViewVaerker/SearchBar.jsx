"use client";
import { useState } from "react";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import { searchArtworks } from "@/librery/artworkUtils";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const setSearchResults = useArtworkStore((state) => state.setSearchResults);

  const handleSearch = async () => {
    if (query.trim() === "") return;
    const results = await searchArtworks(query.trim());
    setSearchResults(results);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Søg værk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 py-3 px-6 w-xl border bg-(--white) mt-5"
      />
      <div className="m-auto">
        <SecondaryButton onClick={handleSearch}>Søg</SecondaryButton>
      </div>
    </div>
  );
};

export default SearchBar;

