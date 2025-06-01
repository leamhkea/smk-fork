import { create } from "zustand";
import { persist } from "zustand/middleware";

const useArtworkStore = create(
  persist(
    (set, get) => ({
      // DATA-SORTERING // Kaldes på i utils til load-more knap
      artworks: [], // alle artworks fra datasættet (fuldt array)
      initialArtworks: [], //de første artworks, der er loadet på siden
      visibleArtworks: [], // de værker, der vises på siden: 30, 60, 90 osv.
      offset: 0, //starter med at vise 0 værker


      // FILTRERING //
      allFilters: {
        artist: "",
        period: "",
        nationality: "",
        type: "",
      },
      filteredArtworks: [], //defineret til at bruge til load-more

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
          filteredArtworks: filtered,
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

      //til maxArtowkors og datoer (bruges på tværs af input og GemVaerk komponenter):
      selectedLocation: null,
      setSelectedLocation: (location) => set({ selectedLocation: location }), //lagrer den valgte lokation fra inputs globalt til at bruge på tværs af komponenterne

      selectedDate: null,
      setSelectedDate: (date) => set({ selectedDate: date }),

      //setter burgerens inputs
      setInputValue: (field, value) =>
        set((state) => ({
          inputValue: {
            ...state.inputValue,
            [field]: value,
          },
        })),

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
      kladdeSum: () => get().savedEvents.length,

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
     
        selectedEventId: null,

        setSelectedEventId: (id) => set({ selectedEventId: id }),

        loadKladdeTilRedigering: (eventId) => {
          const { savedEvents, artworks } = get();
          const eventToEdit = savedEvents.find((e) => e.id === eventId);
          if (eventToEdit) {
            // Find de faktiske værk-objekter ud fra deres IDs
            const matchedVaerker = artworks.filter((vaerk) =>
              eventToEdit.artworkIds.includes(vaerk.object_number)
            );
        
            set({
              inputValue: eventToEdit,
              selectedEventId: eventId,
              gemteVaerker: matchedVaerker,
            });
          }
        },
        
        saveKladde: () => {
          const state = get();

          const isEditing = state.savedEvents.some(
            (event) => event.id === state.inputValue.id
          ); //hvis event id er det samme som inputValue.id betyder det at brugeren er i redigeringsmode

          const updatedEvent = {
            ...state.inputValue,
            id: state.inputValue.id || crypto.randomUUID(), //eksisterer id, bruges det ellers oprettes et nyt
            artworkIds: state.gemteVaerker.map((v) => v.object_number),
          };

          const newEvents = isEditing //er isEditing true, opdateres eksisterende event med samme id
            ? state.savedEvents.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
              )
            : [...state.savedEvents, updatedEvent]; //er den false, tilføjes updatedEvent spm ny post

          set({ savedEvents: newEvents });

          // Reset kun input og tilstand,kun gemte værker ved ny oprettelse
          set({
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
            selectedEventId: null,
            selectedLocation: null,
            selectedDate: null,
            ...(isEditing ? {} : { gemteVaerker: [] }), // behold værker ved redigering
          });
        },

        //bruges ved onclick af opret-arrangement, så brugeren ikke forbliver i redigeringsmode
        resetForm: () => {
          set({
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
            gemteVaerker: [],
            selectedEventId: null,
            selectedLocation: null,
            selectedDate: null,
          });
        },
  

        //PUBLICEREDE EVENTS
        publishedEvents: [], //tomt array til alle publicerede events

        //get savedEvents efter publicering så det vises på siden
        updatePublishedEvents: (nyeEvents) => {
          set({
            publishedEvents: nyeEvents, // setter nye events sammen med de andre fra api'et
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

//Offset (load kun 30 værker ad gangen)
//https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/

//til forståelse af håndtering af filtrering:

//includes()
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

//some()
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some

//tyoeof
//https://www.w3schools.com/js/js_typeof.asp
