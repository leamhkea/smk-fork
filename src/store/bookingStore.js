import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookingStore = create(
  persist((set, get) => ({
    // Vores array som indeholder billet objekterne
    billetter: [],

    // Tilføjer en billet til arrayet
    addItem: (billet) =>
      set((state) => ({
        billetter: state.billetter.concat(billet),
      })),

    // Øger mængden af billetter
    incQuantity: (billetID) =>
      set((state) => ({
        billetter: state.billetter.map((billet) => {
          if (billet.id === billetID) {
            return { ...billet, antal: billet.antal + 1 };
          } else {
            return billet;
          }
        }),
      })),

    // Sænker mængden af et item, men aldrig under 1
    decQuantity: (billetID) =>
      set((state) => ({
        billetter: state.billetter.map((billet) => {
          if (billet.id === billetID) {
            const nyAntal = billet.antal > 1 ? billet.antal - 1 : 1;
            return { ...billet, antal: nyAntal };
          } else {
            return billet;
          }
        }),
      })),
  }))
);
