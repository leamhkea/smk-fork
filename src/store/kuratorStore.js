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
      handleLoadMore: async () => {
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
          const vaelgKunstner =
            !allFilters.artist || item.artist?.includes(allFilters.artist); //filtrerer efter ikke-eksakte matches

          const vaelgPeriode =
            !allFilters.period ||
            item.production_date?.some((p) => p.period === allFilters.period); //filtrerer efter mindst ét match

          const vaelgNationalitet =
            !allFilters.nationality ||
            item.production?.some(
              (n) => n.creator_nationality === allFilters.nationality
            );

          const vaelgKunstart =
            !allFilters.type ||
            item.object_names?.some((n) => n.name === allFilters.type);

          return (
            vaelgKunstner && vaelgPeriode && vaelgNationalitet && vaelgKunstart
          );
        });

        set({
          visibleArtworks: filtered.slice(0, 30), //skal opdateres så den henter 30 mere fra samme filtrer og ikke bare genstarter
          offset: 30,
        });
      },

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
        title: "",
        description: "",
        date: "",
        locationId: "",
        curator: "",
        artworkIds: [],
        totalTickets: "",
        bookedTickets: "",
        location: {
          locationId: "",
          name: "",
          address: "",
          maxGuests: "",
          maxArtworks: "",
        },
      },
      savedEvents: [], //tomt array til gemte kladder

      //til maxArtowkors og datoer:
      selectedLocation: null,
      setSelectedLocation: (location) => set({ selectedLocation: location }), //lagrer den valgte lokation fra inputs globalt til at bruge på tværs af komponenterne

      selectedDate: null,
      setSelectedDate:(date)=>set({selectedDate: date}),

      //setter burgerens inputs
      setInputValue: (field, value) =>
        set((state) => ({
          inputValue: {
            ...state.inputValue,
            [field]: value,
          },
        })),

      // isEventSaved: (id) => get().savedEvents.some((e) => e.id === id),

      //returnerer objektet
      getInputValue: () => get().inputValue,

      //slet et arrangement
      sletInputValue: (arrangementID) =>
        set((state) => ({
          savedEvents: state.savedEvents.filter(
            (event) => event?.id !== arrangementID
          ),
        })),

      //antal af gemte kladder
      kladdeSum: () =>
        get().savedEvents.reduce(
          (accumulator, currentValue) =>
            typeof currentValue.antal === "number"
              ? accumulator + currentValue.antal
              : accumulator, //skal opdateres for wtf??
          0
        ),

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
          gemteVaerker: state.gemteVaerker.filter(
            (vaerk) => vaerk?.object_number !== vaerkObjectNumber
          ),
        })),

        //REDIGER KLADDE//

        // Vælg kladde der skal redigeres
        selectedEventId: null,

        setSelectedEventId: (id) => set({ selectedEventId: id }),

        // Fyld inputValue med værdier fra eksisterende kladde (denne bruges ti kladde-komponenten)
        loadKladdeTilRedigering: (eventId) => {
          const { savedEvents } = get();
          const eventToEdit = savedEvents.find((e) => e.id === eventId);
          if (eventToEdit) {
            set({
              inputValue: eventToEdit,
              selectedEventId: eventId,
            });
          }
        },

        // Opdater eksisterende kladde (hvis selectedEventId er sat), ellers tilføj ny
        saveKladde: () => {
          const state = get();
          const existingIndex = state.savedEvents.findIndex(
            (event) => event.id === state.inputValue.id
          ); //Søger i savedEvents efter et event med samme id som input-formularens - bruges til at finde ud af, om vi opdaterer en eksisterende kladde eller tilføjer en ny

          //bruges til at nulstille formularen ved lykket submission, så kurator kan oprette flere værker uafhængigt af hinanden
          const initialInputValue = {
            title: "",
            description: "",
            date: "",
            locationId: "",
            curator: "",
            artworkIds: [],
            totalTickets: "",
            bookedTickets: "",
            location: {
              locationId: "",
              name: "",
              address: "",
              maxGuests: "",
              maxArtworks: "",
            },
          };          
        
          const updatedEvent = {
            ...state.inputValue, //stater inputValue-arrayet
            id: state.inputValue.id || crypto.randomUUID(), //har værket allerede et ID beholdes det ellers skabes et nyt
            artworkIds: state.gemteVaerker.map((params) => params.object_number), //matcher smks object_number
          };
        
          //Til hvis man redigerer en eksisterende kladde
          if (existingIndex !== -1) {  // !== -1 definerer at der eksisterer et event med samme ID
            const newEvents = [...state.savedEvents];
            newEvents[existingIndex] = updatedEvent; //udskifter det fundne event med det opdaterede
            set({ savedEvents: newEvents }); //opdaterer ny liste
          } else { //hvis existingIndex === -1 findes ID'et ikke og der skal oprettes et nyt event
            set({ savedEvents: [...state.savedEvents, updatedEvent] });
          }
        
          // nulstiller inputtet ved at kalde tilbage på initialInputValue  
          set({
            inputValue: initialInputValue,
            gemteVaerker: [],
          });
        },        
        
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

