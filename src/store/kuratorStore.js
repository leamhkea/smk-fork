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

//starter med tomt array
filters: {
  artist: "",
  period: "",
  nationality: "",
  type: "",
},

//opdaterer filter-objektet uden at slette de eksisterende filtre. Var spreading ikke brugt, ville det slette de gamle filtre
setFilter: (newFilters) => {
  set({ filters: { ...get().filters, ...newFilters } }); //get().filters = beholder de eksisterende filtre. ...newfilters overskriver med de nye. Set bruges til at opdatere statet
  get().getFilter(); //opdaterer nu også visningen i listview
},

getFilter: () => {
  const { filters, artworks } = get();
  const filtered = artworks.filter((item) => {
    const kunstnerFilter = filters.artist
      ? item.artist?.some((kunstner) => kunstner === filters.artist) //some() bruges til at tjekke om værket matcher det valgte filter og eksisterer i arrayet - hvis mindst én mather, returneres værdien
      : true; //matcher titlen med det enklete værks indhold, returneres den som true og bliver dermed vist.

    const periodeFilter = filters.period
      ? item.production_date?.some((periode) => periode.period === filters.period)
      : true;

    const nationalitetFilter = filters.nationality
      ? item.content_person_full?.some((nationalitet) => nationalitet.nationality === filters.nationality)
      : true;

    const kunsttypeFilter = filters.type
      ? item.object_names?.some((kunsttype) => kunsttype.name === filters.type)
      : true;

    return kunstnerFilter && periodeFilter && nationalitetFilter && kunsttypeFilter;
  });

  set({
    visibleArtworks: filtered.slice(0, 30), //sørger for at der stadigvæk kun vises 30 ad gangen efter filtrering, og sætter den endelige filtrering
    offset: 30,
  });
},
}));

export default useArtworkStore;
