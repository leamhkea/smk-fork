import { create } from "zustand";
import { persist } from "zustand/middleware";

const useArtworkStore = create(
  persist(
    (set, get) => ({

      // DATA-SORTERING //
      artworks: [], // alle artworks fra datasættet (fuldt array)
      initialArtworks: [], //de første artworks, der er loadet på siden
      visibleArtworks: [], // de værker, der vises på siden: 30, 60, 90 osv.
      offset: 0,

      setArtworks: (newArtworks) => {
        set({
          artworks: newArtworks,
          initialArtworks: newArtworks,
          visibleArtworks: newArtworks.slice(0, 30),
          offset: 30,
        });
      },

      handleLoadMore: () => {
        const { artworks, visibleArtworks, offset } = get();
        const nextBatch = artworks.slice(offset, offset + 30);
        if (nextBatch.length > 0) {
          set({
            visibleArtworks: [...visibleArtworks, ...nextBatch],
            offset: offset + 30,
          });
        }
      },

      hasMore: () => {
        const { artworks, visibleArtworks } = get();
        return visibleArtworks.length < artworks.length;
      },

      // FILTRERING //
      allFilters: {
        artist: "",
        period: "",
        nationality: "",
        type: "",
      },

      setFilter: (newFilters) => {
        set({ allFilters: { ...get().allFilters, ...newFilters } });
        get().getFilter();
      },

      getFilter: () => {
        const { allFilters, artworks } = get();

        const filtered = artworks.filter((item) => {
          const vaelgKunstner = !allFilters.artist || item.artist?.includes(allFilters.artist);
          const vaelgPeriode = !allFilters.period || item.production_date?.some(p => p.period === allFilters.period);
          const vaelgNationalitet = !allFilters.nationality || item.production?.some(n => n.creator_nationality === allFilters.nationality);
          const vaelgKunstart = !allFilters.type || item.object_names?.some(n => n.name === allFilters.type);
          return vaelgKunstner && vaelgPeriode && vaelgNationalitet && vaelgKunstart;
        });

        set({
          visibleArtworks: filtered.slice(0, 30), //skal opdateres så den henter 30 mere fra samme filtrer og ikke bare genstarter
          offset: 30,
        });
      },

      // GEMTE VÆRKER //
      gemteVaerker: [],

      //tilføjer værk til array
        addVaerk: (vaerk) =>
          set((state) => ({
            gemteVaerker: state.gemteVaerker.concat({ ...vaerk, antal: 1 }), //spreading og antal taler her sammen med vaerkSum
          })),
        

        //det samlede antal af værker dispalyed
        vaerkSum: () =>
          get().gemteVaerker
            .filter((v) => v && typeof v.antal === "number") //sikrer at der ikke er nogle null-elementer fra api'et
            .reduce((accumulator, currentValue) => accumulator + currentValue.antal,0),
        
      //gør det muligt at slette et enkelt værk
      sletVaerk: (vaerkObjectNumber) =>
        set((state) => ({
          gemteVaerker: state.gemteVaerker.filter((vaerk) => vaerk?.object_number !== vaerkObjectNumber),
        })),


        //sletter alle værker
      emptyGemteVaerker: () => set({ gemteVaerker: [] }),

      
      //SØGEFUNKTION//

      //gemmer søgeresultatet
      setSearchResults: (results) => {
        set({
          artworks: results,
          visibleArtworks: results.slice(0, 30),
          offset: 30,
        });
      },   
      
      //resetter til de orginale artworks (bruges når søgefeltet er tom og trykkes enter)
      resetToInitial: () => {
        const original = get().initialArtworks;
        set({
          artworks: original,
          visibleArtworks: original.slice(0, 30),
          offset: 30,
        });
      },
        
    }),
    {
      name: "kuratorstorage",
      partialize: (state) => ({
        gemteVaerker: state.gemteVaerker,
        allFilters: state.allFilters,
      }),
    }
  )
);

export default useArtworkStore;



