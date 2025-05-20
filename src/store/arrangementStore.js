import Arrangementer from "@/app/arrangementer/page";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useArrangementStore = create(
  persist(
    (set, get) => ({
      // Her laves array med alle arrangementer, så vi kan kalde tilbage til startpoint.
      // Pr default er den tom, så vi vil gerne fylde den op med vores sortering...
      arrangementer: [],

      // Arrangementer er det fulde array, derfor lavet visteArrangementer, som kun indeholder et filtreret array
      visteArrangementer: [],

      // Filtre (tom streng - vil gerne fylde op gennem vores funktioner)
      allFilters: {
        title: "",
        date: "",
        lokation:"",
        inventarnummer:"",
      },

      setFilter: (newFilters) => {
        // Skal have de nye filtre, som skal sendes op til allFilters. Derfor spreader vi dem
        set({ allFilters: { ...get().allFilters, ...newFilters } });

        // Kalder/opdaterer den nye funktion, som vi laver nedenunder
        get().getFilter();
      },

      // Denne funktion skal ikke have parametre, da den returnere mange const, som vi bruger i filtrerings component
      getFilter: () => {
        const { allFilters, arrangementer } = get();

        const filteredArrangementer = arrangementer.filter((parameter) => {
          // Returner titler hvis event har en, ellers kom med en fejlmeddelelse
          const valgtTitle =
            !allFilters.title || parameter.title?.includes(allFilters.title);

          const valgtDate =
            !allFilters.date || parameter.date?.includes(allFilters.date); //bruger includes(), da det ønskes også at vise delvise matches på siden og ikke strengt taget samme værdi

            const valgtLokation = //denne del bruges til filtrering for kurator ved opret arrangement
            !allFilters.lokation || parameter.locationID === allFilters.lokation; //skal ikke bruges includes(), da den skal matche eksakt i lokationer

            const valgtInventarnummer = 
            !allFilters.inventarnummer || parameter.inventarnummer === allFilters.inventarnummer;

          return valgtTitle && valgtDate && valgtLokation && valgtInventarnummer; 
        });

        set({
          // Her kalder visteArrangementer på filteredArrangementer, for at "sætte" filtreringen på det opdaterede array
          visteArrangementer: filteredArrangementer,
        });
      },

      // ÆNDRING
      setArrangementer: (data) => {
        set({ arrangementer: data, visteArrangementer: data });
      },
    }),

    { name: "storage" }
  )
);

export default useArrangementStore;