import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBekraeftelseStore = create(
  persist(
    (set) => ({
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
    {
      name: "bekraeftelse-storage", // bruges som key i localStorage
    }
  )
);

export default useBekraeftelseStore;
