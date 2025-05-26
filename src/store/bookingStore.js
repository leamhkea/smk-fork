import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set, get) => ({
      // Vores array som indeholder objekter ( arrangementbillerne )
      billetter: [],

      // Ny state til bekræftelse: gemte billetter og kontaktinfo til ordrebekræftelsen
      bekraeftelsesBilletter: [],
      bekraeftelsesKontaktoplysninger: {
        forNavn: "",
        efterNavn: "",
        email: "",
        mobilNummer: "",
      },

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

      // =================== VIDEREFØRER UDFYLDTE KONTAKTINFORMATIONER TIL ORDREBEKRÆFTELSE ==============================

      // Gemmer både billetter og kontaktoplysninger til bekræftelse
      saveBekraeftelsesData: (kontaktoplysninger) => {
        const { billetter } = get();
        set({
          bekraeftelsesBilletter: billetter,
          bekraeftelsesKontaktoplysninger: kontaktoplysninger,
        });
      },

      kontaktoplysninger: {
        forNavn: "",
        efterNavn: "",
        email: "",
        mobilNummer: "",
      },

      // Sæt ét felt ad gangen
      setKontaktoplysninger: (field, value) =>
        set((state) => ({
          kontaktoplysninger: {
            ...state.kontaktoplysninger,
            [field]: value,
          },
        })),

      // Reset alle felter
      resetKontaktoplysninger: () =>
        set(() => ({
          kontaktoplysninger: {
            forNavn: "",
            efterNavn: "",
            email: "",
            mobilNummer: "",
          },
        })),
    }),
    { name: "storage" }
  )
);

export default useBookingStore;
