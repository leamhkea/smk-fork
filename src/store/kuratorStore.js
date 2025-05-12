import { create } from "zustand";
import { persist } from "zustand/middleware";

const useArtworkStore = create(
  persist(
    (set, get) => ({
      artworks: [],

      // Load or update artworks
      setArtworks: (newArtworks) => set({ artworks: newArtworks }),

      // Filter artworks that have images
      filterHasImage: () => {
        const filtered = get().artworks.filter(item => item.has_image);
        return filtered;
      },

      // Limit to 30 artworks
      limitTo30: () => {
        return get().artworks.slice(0, 30);
      },

      // Show next 30 artworks based on offset
      visFlere: (offset) => {
        return get().artworks.slice(offset, offset + 30);
      },
    }),
    { name: "artwork-storage" }
  )
);

export default useArtworkStore;




// &&
//     item.object_names?.some(obj => obj.name === "Fotografi (kunst)") //kun fotografier????
