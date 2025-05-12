import { create } from "zustand";

const useArtworkStore = create((set, get) => ({

  // DATA-SORTERING //

  artworks: [], // alle artworks fra datasættet (fuldt array)
  visibleArtworks: [], // de værker, der vises på siden: 30, 60, 90 osv.
  offset: 0, // holder styr på hvor langt vi er i rækken (starter ved 0)

  // Sætter de første 30 værker og initialiserer offset
  setArtworks: (newArtworks) => {
    set({
      artworks: newArtworks,
      visibleArtworks: newArtworks.slice(0, 30), // starter med de første 30 værker
      offset: 30, // næste batch starter ved indeks 30
    });
  },

  // Loader de næste 30 værker, når knappen (på clientlist) trykkes
  handleLoadMore: () => {
    const { artworks, visibleArtworks, offset } = get(); // henter aktuel state
    const nextBatch = artworks.slice(offset, offset + 30); // definerer de næste 30 værker

    // Hvis der er mere at hente, tilføj dem til listen
    if (nextBatch.length > 0) {
      set({
        visibleArtworks: [...visibleArtworks, ...nextBatch], // tilføj dem til de synlige. Bruger spreading så der tilføjes nye værker til det eksisterende array uden at overskrive de gamle
        offset: offset + 30, // opdater offset til næste gang
      });
    }
  },

  // Tjekker om der stadig er værker tilbage at vise
  hasMore: () => {
    const { artworks, visibleArtworks } = get();
    return visibleArtworks.length < artworks.length; // true hvis der er mere at vise
  },
}));

export default useArtworkStore;
