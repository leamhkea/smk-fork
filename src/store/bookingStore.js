import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set, get) => ({
      // Vores array som indeholder objekter ( arrangementbillerne )
      billetter: [],

      // Tilføjer en billet til arrayet
      addBillet: (billet) =>
        set((state) => ({
          billetter: state.billetter.concat(billet),
        })),

      // Øger mængden af billetter
      incAntal: (billetID) =>
        set((state) => ({
          billetter: state.billetter.map((billet) => {
            if (billet.id === billetID) {
              return { ...billet, antal: billet.antal + 1 };
            } else {
              return billet;
            }
          }),
        })),

      // Sænker mængden af billetter, men aldrig under 1
      decAntal: (billetID) =>
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

      // Gør quantity dynamisk i basketicon og kurven
      billetSum: () =>
        get().billetter.reduce(
          (accumulator, currentValue) => accumulator + currentValue.antal,
          0
        ),

      // Fjerner en billet helt
      sletBillet: (billetID) =>
        set((state) => ({
          billetter: state.billetter.filter((billet) => billet.id !== billetID),
        })),

      // Tømmer hele kurven
      emptyKurv: () => set({ billetter: [] }),

      // Laver animation når popover menu fjernes
      isKurvVisible: false,

      showKurv: () => set({ isKurvVisible: true }),

      hideKurv: () => {
        set({ isKurvVisible: false });
        setTimeout(() => {
          const onCloseCallback = get().onKurvClose;
          if (onCloseCallback) {
            onCloseCallback(); // Hvis du har defineret en callback
          }
        }, 500); // Match din animationstid
      },

      setOnKurvClose: (callback) => set({ onKurvClose: callback }),
    }),
    { name: "storage", partialize: (state) => ({ billetter: state.billetter }) }
  )
);

export default useBookingStore;
