"use client";

// Imports udefra
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

// Imports egne components
import KurvCard from "../kurvview/KurvCard";
import useBookingStore from "@/store/bookingStore";
import FormOplysninger from "./FormOplysninger";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import GoBackArrow from "@/components/global/buttons/GoBackArrow";

const OrdreCard = () => {
  // Initialiserer router til navigation
  const router = useRouter();
  const methods = useForm();

  // Gemmer data til bekræftelsessiden
  const saveBekraeftelsesData = useBookingStore(
    (state) => state.saveBekraeftelsesData
  );

  // Listen over billetter i kurven
  const billetter = useBookingStore((state) => state.billetter);

  // Funktion, der returnerer summen af billetter
  const billetSumFn = useBookingStore((state) => state.billetSum);

  // Funktion til at opdatere kontaktoplysninger ét felt ad gangen
  const setKontaktoplysninger = useBookingStore(
    (state) => state.setKontaktoplysninger
  );

  // Funktion til at tømme kurven
  const emptyKurv = useBookingStore((state) => state.emptyKurv);

  // Kalder billetSum for at få det aktuelle antal billetter
  const billetSum = billetSumFn(); // kald funktionen uden for hooken

  const onSubmit = async (data) => {
    // Gem kontaktoplysninger i Zustand
    Object.entries(data).forEach(([field, value]) => {
      setKontaktoplysninger(field, value);
    });

    // Loop gennem alle billetter og send PUT-request til API
    const results = await Promise.all(
      billetter.map(async (billet) => {
        const res = await fetch(
          `https://async-exhibit-server-rmug.onrender.com/events/${billet.id}/book`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets: billet.antal }),
          }
        );

        // Hvis API-kald fejler
        if (!res.ok) {
          alert(
            `Kunne ikke booke billet til arrangement: "${billet.title}". Prøv igen senere.`
          );
          return false;
        }
        return true;
      })
    );

    // Alt lykkedes – gem og fortsæt
    saveBekraeftelsesData(data);

    setTimeout(() => {
      emptyKurv();
    }, 500);

    router.push("/ordrebekraeftelse");
  };

  return (
    <div>
    <GoBackArrow/>
    <div className="flex flex-col lg:flex-row gap-6">
      {/* ====================== BASKET INDHOLD ======================= */}
      {/* Order summary --> bliver sticky kun på større skærme */}
      <div className="min-h-150 flex-1 bg-white px-6 py-10 shadow-md">
        <p>Antal billetter ({billetSum})</p>
        <hr className="mb-12" />

        <div>
          {billetter && billetter.length > 0 ? (
            billetter.map((billet) => (
              <KurvCard key={billet.id} event={billet} />
            ))
          ) : (
            <p>Der er ingen arrangementer tilføjet til kurvet</p>
          )}
        </div>
      </div>

      {/* ===================== KONTAKTOPLYSNINGER ====================== */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="min-h-150 flex-1 bg-white px-6 py-10 shadow-md flex flex-col justify-between"
        >
          <div>
            <p>Kontaktoplysninger</p>
            <hr className="mb-12" />

            <FormOplysninger />
          </div>

          <SecondaryButton type="submit">Bekræft booking</SecondaryButton>
        </form>
      </FormProvider>
    </div>
    </div>
  );
};

export default OrdreCard;
