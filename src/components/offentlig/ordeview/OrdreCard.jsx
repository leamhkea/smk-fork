"use client";

// Imports udefra
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

// Imports egne components
import KurvCard from "../kurvview/KurvCard";
import useBookingStore from "@/store/bookingStore";
import FormOplysninger from "./FormOplysninger";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";

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

  // En funktion, der returnerer summen af billetter
  const billetSumFn = useBookingStore((state) => state.billetSum);

  // En funktion til at opdatere kontaktoplysninger ét felt ad gangen
  const setKontaktoplysninger = useBookingStore(
    (state) => state.setKontaktoplysninger
  );

  // Funktion til at tømme kurven
  const emptyKurv = useBookingStore((state) => state.emptyKurv);

  // Kalder billetSum for at få det aktuelle antal billetter
  const billetSum = billetSumFn(); // kald funktionen uden for hooken

  const onSubmit = (data) => {
    // Gem kontaktoplysninger i state ét felt ad gangen (valgfrit – men ikke nødvendigt her)
    Object.entries(data).forEach(([field, value]) => {
      setKontaktoplysninger(field, value);
    });

    // Gem billetter og kontaktoplysninger til bekræftelse
    saveBekraeftelsesData(data);

    // Slet kurven efter kort delay
    setTimeout(() => {
      emptyKurv();
    }, 500);

    router.push("/ordrebekraeftelse");
  };

  return (
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

          <TertrieryButton type="submit">Bekræft booking</TertrieryButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default OrdreCard;
