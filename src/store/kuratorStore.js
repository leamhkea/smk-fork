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

//FILTRERING// 

// Initialiser filter state
allFilters: {
  artist: "",
  period: "",
  nationality: "",
  type: "",
},

// Updaterer filrenes values uden at slette de gamle
setFilter: (newFilters) => {
  set({ allFilters: { ...get().allFilters, ...newFilters } });
  get().getFilter(); // opdaterer
},

// Tilføj alle aktive filtre til listview
getFilter: () => {
  const { allFilters, artworks } = get();

  const filtered = artworks.filter((item) => {
    //vælg kunstner
    const vaelgKunstner = !allFilters.artist || item.artist?.includes(allFilters.artist);
    //vælg tidsperiode
    const vaelgPeriode = !allFilters.period || item.production_date?.some(p => p.period === allFilters.period);
    //vælg nationalitet
    const vaelgNationalitet = !allFilters.nationality || item.production?.some(n => n.creator_nationality === allFilters.nationality);
    //vælg kunstart
    const vaelgKunstart = !allFilters.type || item.object_names?.some(n => n.name === allFilters.type);

    return vaelgKunstner && vaelgPeriode && vaelgNationalitet && vaelgKunstart;
  });

  set({
    visibleArtworks: filtered.slice(0, 30), //setter artworks, og limiter igen til 30
    offset: 30,
  });
},
}));

export default useArtworkStore;
