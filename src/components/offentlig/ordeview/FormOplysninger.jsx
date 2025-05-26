import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import useBookingStore from "@/store/bookingStore";

export default function FormOplysninger() {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const setKontaktoplysninger = useBookingStore(
    (state) => state.setKontaktoplysninger
  );
  const router = useRouter();

  // Billetter og emptykurv hentes for at kurven slettes ved bekræft booking
  const emptyKurv = useBookingStore((state) => state.emptyKurv);
  const billetter = useBookingStore((state) => state.billetter);

  const onSubmit = (data) => {
    // Gemmer form-data i localStorage til debugging
    localStorage.setItem("debugKontakt", JSON.stringify(data));

    // Gemmer i Zustand store
    Object.entries(data).forEach(([field, value]) => {
      setKontaktoplysninger(field, value);
    });

    // Tøm kurven her efter formular data er håndteret
    emptyKurv();

    // Vent 300 ms før routing, så persist kan nå at gemme tom kurv i localStorage
    setTimeout(() => {
      router.push("/ordrebekraeftelse");
    }, 300);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div className="grid gap-8">
          <div>
            {/* ======================= FORNAVN ======================= */}
            <input
              className="border border-gray-300 p-3 w-full"
              {...register("forNavn", {
                required: "Fornavn er påkrævet",

                // Inputtet skal bestå af danske bogstaver (store eller små), og der skal være mindst ét bogstav
                pattern: /^[A-Åa-å]+$/i,
              })}
              placeholder="Fornavn *"
            />
            {/* Message kalder tilbage på required */}
            <p className="text-red-600 text-sm">{errors.forNavn?.message}</p>
            {errors?.forNavn?.type === "pattern" && (
              <p className="text-red-600 text-sm">Kun alfabetiske tegn</p>
            )}
          </div>

          <div>
            {/* ====================== EFTERNAVN ======================= */}
            <input
              className="border-1 border-gray-300 p-3 w-full"
              {...register("efterNavn", {
                required: "Efternavn er påkrævet",

                // Inputtet skal bestå af danske bogstaver (store eller små), og der skal være mindst ét bogstav
                pattern: /^[A-Åa-å]+$/i,
              })}
              placeholder="Efternavn *"
            />
            {/* Message kalder tilbage på required */}
            <p className="text-red-600 text-sm">{errors.efterNavn?.message}</p>
            {errors?.efterNavn?.type === "pattern" && (
              <p className="text-red-600 text-sm">Kun alfabetiske tegn</p>
            )}
          </div>

          <div>
            {/* ======================== EMAIL ======================== */}
            <input
              className="border-1 border-gray-300 p-3 w-full"
              {...register("email", {
                required: "E-mail er påkrævet",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ugyldig e-mailadresse",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="E-mail *"
            />
            <p className="text-red-600 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            {/* ===================== MOBILNUMMER ====================== */}
            <input
              className="border-1 border-gray-300 p-3 w-full"
              type="text"
              {...register("mobilNummer", {
                required: "Mobilnummer er påkrævet",
                minLength: {
                  value: 8,
                  message: "Mobilnummer skal bestå af 8 cifre",
                },
                maxLength: {
                  value: 8,
                  message: "Mobilnummer skal bestå af 8 cifre",
                },
                pattern: {
                  // Sikrer at det kun indeholder cifre (0-9)
                  value: /^[0-9]{8}$/,
                  message: "Mobilnummer skal kun indeholde tal",
                },
              })}
              placeholder="Mobilnummer *"
            />
            {/* Message kalder tilbage på required */}
            <p className="text-red-600 text-sm">
              {errors.mobilNummer?.message}
            </p>
          </div>
        </div>

        {/* ======================== SUBMIT ======================= */}

        <TertrieryButton type="submit">Bekræft booking</TertrieryButton>
      </form>
    </FormProvider>
  );
}

// ======================== INFORMATION OM TEGN BRUGT I INPUT FELTER ==========================

//        ^     =  starten på strengen
//        $     =  slutningen på strengen
//    [A-Åa-å]  =  indeholde bogstaver fra A-Å (inklusiv store og små)
//        +     =  mindst ét af de godkendte tegn i pattern
//        i     =  skelner ikke mellem store og små bogstaver
//    [^\s@]+   =  et eller flere tegn, som ikke er mellemrum eller @
//        @     =  skal indeholde et @
//        \.    =  skal indeholde et punktum
