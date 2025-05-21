import { create } from "zustand";
import { persist } from "zustand/middleware";

const useArtworkStore = create(
  persist(
    (set, get) => ({

      // DATA-SORTERING //
      artworks: [], // alle artworks fra datasættet (fuldt array)
      initialArtworks: [], //de første artworks, der er loadet på siden
      visibleArtworks: [], // de værker, der vises på siden: 30, 60, 90 osv.
      offset: 0, //starter med at vise 0 værker

      //setter artworks (fylde de definerede tomme strenge)
      setArtworks: (newArtworks) => {
        set({
          artworks: newArtworks,
          initialArtworks: newArtworks,
          visibleArtworks: newArtworks.slice(0, 30), //bruger slice til kun at vise 30
          offset: 30, //sætter nu offset og viser 30
        });
      },

      //viser de næste 30, uafhængig af de første der er vist
      handleLoadMore: () => {
        const { artworks, visibleArtworks, offset } = get();
        const loadMore = artworks.slice(offset, offset + 30);
        if (loadMore.length > 0) {
          set({
            visibleArtworks: [...visibleArtworks, ...loadMore],
            offset: offset + 30, //"vis det allerede satte offset, og load nu 30 mere"
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
          const vaelgKunstner = !allFilters.artist || item.artist?.includes(allFilters.artist); //filtrerer efter ikke-eksakte matches 

          const vaelgPeriode = !allFilters.period || item.production_date?.some(p => p.period === allFilters.period); //filtrerer efter mindst ét match

          const vaelgNationalitet = !allFilters.nationality || item.production?.some(n => n.creator_nationality === allFilters.nationality);

          const vaelgKunstart = !allFilters.type || item.object_names?.some(n => n.name === allFilters.type);

          return vaelgKunstner && vaelgPeriode && vaelgNationalitet && vaelgKunstart;
        });

        set({
          visibleArtworks: filtered.slice(0, 30), //skal opdateres så den henter 30 mere fra samme filtrer og ikke bare genstarter
          offset: 30,
        });
      },

      // VÆLG ET VÆRK //
      gemteVaerker: [],

      //tilføjer værk til array
        addVaerk: (vaerk) =>
          set((state) => ({
            gemteVaerker: state.gemteVaerker.concat({ ...vaerk, antal: 1 }), //spreading og antal taler her sammen med vaerkSum
          })),
        
      //gør det muligt at fravælge et enkelt værk
      sletVaerk: (vaerkObjectNumber) =>
        set((state) => ({
          gemteVaerker: state.gemteVaerker.filter((vaerk) => vaerk?.object_number !== vaerkObjectNumber),
        })),

        //fjerner lagringen til når brugeren har gemt kladden
        resetVaerker: () => set({ gemteVaerker: [] }),

      
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

      //OPRET VÆRK//

      inputValue: {
        titel: "",
        beskrivelse: "",
        lokation:"",
        dato: "",
        inventarnummer: [],
      },
      savedEvents: [], //tomt array til gemte kladder

      //setter burgerens inputs
      setInputValue: (field, value) =>
        set((state) => ({
          inputValue: {
            ...state.inputValue,
            [field]: value,
          },
        })),

        //tilføjer event
          addEvent: (eventData) =>
            set((state) => ({
              savedEvents: [ //udfylder det tomme array
                ...state.savedEvents,
                { ...eventData, id: crypto.randomUUID() }, //skaber unikt id
              ],
            })),
          

        isEventSaved: (id) => get().savedEvents.some((e) => e.id === id),

      //returnerer objektet 
      getInputValue: () => get().inputValue,

      //resetter input, så kurator kan opprette et nyt arrangement flere gange
      resetInputValue: () =>
        set(() => ({
          inputValue: {
            titel: "",
            beskrivelse: "",
            lokation: "",
            dato: "",
            inventarnummer: [],
          },
        })),

        //slet et arrangement
        sletInputValue: (arrangementID) =>
          set((state) => ({
            savedEvents: state.savedEvents.filter((event) => event?.id !== arrangementID),
          })),

          //antal af gemte kladder
          kladdeSum: () => 
          get().savedEvents
          .filter((v) => v && typeof v.antal === "number")
          .reduce((accumulator, currentValue) => accumulator + currentValue.antal,0),

      }),
    {
      name: "kuratorstorage",
      partialize: (state) => ({
        gemteVaerker: state.gemteVaerker,
        allFilters: state.allFilters,
        savedEvents: state.savedEvents,
        inputValue: state.inputValue,
      }),
    }
  )
);

export default useArtworkStore;


//DOKUMENTATION BRUGT

//generel forståelse af sorteringen af dataen:

//Offset (load kun 3o værker ad gangen)
//https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/


//til forståelse af håndtering af filtrering:

//includes()
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

//some()
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some

//tyoeof
//https://www.w3schools.com/js/js_typeof.asp