"use client";
import KurvCard from "../kurvview/KurvCard";
import useBookingStore from "@/store/bookingStore";
import FormOplysninger from "./FormOplysninger";
import { useForm, FormProvider } from "react-hook-form";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import { useRouter } from "next/navigation";

const OrdreCard = () => {
  const router = useRouter();
  const methods = useForm();

  const saveBekraeftelsesData = useBookingStore(
    (state) => state.saveBekraeftelsesData
  );
  const billetter = useBookingStore((state) => state.billetter);
  const billetSumFn = useBookingStore((state) => state.billetSum);
  const setKontaktoplysninger = useBookingStore(
    (state) => state.setKontaktoplysninger
  );
  const emptyKurv = useBookingStore((state) => state.emptyKurv);

  const billetSum = billetSumFn(); // kald funktionen uden for hooken

  const onSubmit = (data) => {
    Object.entries(data).forEach(([field, value]) => {
      setKontaktoplysninger(field, value);
    });

    // Gem billetter og kontaktoplysninger til bekræftelse
    saveBekraeftelsesData();

    // Sletter kurven når der klikkes på submit (bekræft booking)
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
          className="flex flex-col lg:flex-row gap-6"
        >
          <div className="min-h-150 flex-1 bg-white px-6 py-10 shadow-md flex flex-col justify-between">
            <p>Kontaktoplysninger</p>
            <hr className="mb-12" />

            <FormOplysninger className="h-full" />
          </div>

          <div className="mt-8">
            <TertrieryButton type="submit">Bekræft booking</TertrieryButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default OrdreCard;
