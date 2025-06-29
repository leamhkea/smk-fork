//imports af egne komponenter
import PrimaryButton from "@/components/global/buttons/PrimaryButton";
import useArtworkStore from "@/store/kuratorStore";
import useArrangementStore from "@/store/arrangementStore";
//imports udefra
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Form from "next/form";
import "react-datepicker/dist/react-datepicker.css";
import DeleteTrash from "@/components/global/ikoner/DeleteTrash";

const Select = dynamic(() => import("react-select"), { ssr: false }); //til hyrdration fail

const DatePicker = dynamic(() => import("react-datepicker"), {
  ssr: false,
  loading: () => <p>Indlæser dato...</p>,
});

const Inputs = ({ events, art }) => {
  //zustand imports
  const { setFilter } = useArrangementStore();
  const { gemteVaerker } = useArtworkStore((state) => state);
  const inputValue = useArtworkStore((state) => state.inputValue);
  const setInputValue = useArtworkStore((state) => state.setInputValue);
  const saveKladde = useArtworkStore((state) => state.saveKladde);
  const setSelectedLocation = useArtworkStore(
    (state) => state.setSelectedLocation
  );
  const setSelectedDate = useArtworkStore((state) => state.setSelectedDate);
  const sletVaerk = useArtworkStore((state) => state.sletVaerk);

  //useRouter
  const router = useRouter();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
    control,
  } = useForm({
    //bruges til redigering af kladder, så det tidligere valgte input vises i rediger-view
    defaultValues: {
      titel: inputValue.title || "",
      beskrivelse: inputValue.description || "",
      locationId: inputValue.location?.id || "",
      dato: inputValue.date ? new Date(inputValue.date) : null,
    },
  });

  // Synkroniserer zustand med react hook (til kunstværkers object_number)
  useEffect(() => {
    setValue(
      "artworkCount",
      gemteVaerker.filter((v) => v && v.object_number).length
    ); //fortæller react-hook-form at artworkcCount er ændret
    trigger("artworkCount"); //trigger ny validering, da skjult input felt ikke fanger det automatisk, da den ikke ved noget er ændret i zustand
  }, [gemteVaerker, setValue, trigger]);

  //LOKATIONER FRA API'ET//
  const [lokation, setLokation] = useState([]);

  useEffect(() => {
    const lokationMap = new Map(); //sørger for der er ingen duplikanter som i set()-constructor, men denne metode kan gemme key-value pairs

    events.forEach((event) => {
      //definerer alle felter, så lokationMap ikke kun modtager value og key (syntaks i map())
      const location = event.location;
      if (location && !lokationMap.has(location.id)) {
        lokationMap.set(location.id, {
          id: location.id,
          name: location.name,
          address: location.address,
          maxArtworks: location.maxArtworks ?? "", // fallback hvis undefined
          maxGuests: location.maxGuests ?? "",
        });
      }
    });

    setLokation([...lokationMap.values()]); //setter alle eksisterende lokationer fra arrayet
  }, [events, art]);

  //MAXARTWORKS//
  const locationId = watch("locationId");
  const selectedLocation = lokation.find((loc) => loc.id === locationId);
  const maxArtworks = selectedLocation?.maxArtworks || Infinity;
  //se GemVaerk(komponent) og kuratorStore - sørger for at man ikke kan klikke på flere ved maxArtworks

  // Finder datoer der allerede er optaget for den valgte lokation
  const optagedeDatoer = events
    .filter(
      (event) => event.location?.id === locationId && event.date // matcher lokation og sørger for dato eksisterer
    )
    .map((event) => new Date(event.date));

  // Liste over gyldige datoer
  const alleDatoer = [
    "2025-05-01",
    "2025-05-02",
    "2025-05-03",
    "2025-05-04",
    "2025-05-05",
    "2025-05-06",
    "2025-05-07",
    "2025-05-08",
    "2025-05-09",
    "2025-05-10",
    "2025-05-11",
    "2025-05-12",
    "2025-05-13",
    "2025-05-14",
    "2025-05-15",
  ].map((params) => new Date(params)); // konverter til Date-objekter

  // Viser kun de datoer, der ikke er optaget
  const gyldigeDatoer = alleDatoer.filter(
    (d) =>
      !optagedeDatoer.some(
        (optaget) => d.toDateString() === new Date(optaget).toDateString()
      )
  );

  //GEMMER KLADDE//
  const gemKladde = () => {
    //tilføjer event til kladder (bruges både til redigering og oprettelse af nyt event)
    saveKladde();

    router.push("/arrangementer"); //navigerer til kladder ved lykket submission
  };

  return (
    <Form onSubmit={handleSubmit(gemKladde)} className="flex flex-col gap-5">
      <h2 className="thin">Opret arrangement</h2>

      {/* TITEL */}
      <div className="flex flex-col">
        <input
          aria-label="indtast titel"
          type="text"
          placeholder="Arrangement titel *"
          {...register("titel", { required: "Titel er påkrævet" })}
          className="border-1 border-(--black) p-2"
          onChange={(e) => {
            setValue("titel", e.target.value); // React Hook Form
            setInputValue("title", e.target.value); // Zustand
          }}
        />
        <p className="text-red-600 text-sm">{errors.titel?.message}</p>
      </div>

      {/* BESKRIVELSE */}
      <div className="flex flex-col">
        <textarea
          aria-label="indtast beskrivelse"
          placeholder="Beskrivelse *"
          {...register("beskrivelse", {
            required: "Beskrivelse er påkrævet",
            maxLength: {
              value: 400,
              message: "Beskrivelse må max bestå af 400 karakterer",
            },
          })}
          className="border-1 border-(--black) p-2 h-50"
          onChange={(e) => {
            setValue("beskrivelse", e.target.value); // React Hook Form
            setInputValue("description", e.target.value); // Zustand
          }}
        />
        <p className="text-sm text-gray-500">
          {inputValue.description.length} / 400 karakterer
        </p>
        <p className="text-red-600 text-sm">{errors.beskrivelse?.message}</p>
      </div>

      {/* LOKATION */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Lokation *</label>
        <Controller
          name="locationId"
          control={control}
          rules={{ required: "Lokation er påkrævet" }}
          render={({ field }) => (
            <Select
              aria-label="Vælg lokation"
              {...field}
              options={lokation.map((loc) => ({
                value: loc.id,
                label: `${loc.name} – ${loc.address}`,
                data: loc,
              }))}
              placeholder="Vælg lokation *"
              value={
                field.value
                  ? lokation
                      .map((loc) => ({
                        value: loc.id,
                        label: `${loc.name} – ${loc.address}`,
                        data: loc,
                      }))
                      .find((option) => option.value === field.value)
                  : null
              }
              onChange={(selectedOption) => {
                const selectedLocation = selectedOption?.data;
                field.onChange(selectedOption?.value); // opdater react-hook-form
                setFilter({ lokation: selectedOption?.value }); // filtering
                setInputValue("location", selectedLocation); // Zustand
                setSelectedLocation(selectedLocation); // Zustand
              }}
              className="border border-(--black) p-2 w-full"
              styles={{
                //styling af reacts default
                control: (base) => ({
                  ...base,
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  fontSize: "18px",
                }),
              }}
            />
          )}
        />
        <p className="text-red-600 text-sm">{errors.locationId?.message}</p>
      </div>

      {/* DATO */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Dato *</label>
        <Controller
          aria-label="Vælg dato"
          name="dato"
          control={control}
          rules={{ required: "Dato er påkrævet" }}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(date); // React Hook Form
                const isoDate = date?.toLocaleDateString("sv-SE"); // sætter datoen til svensk tidszone
                setInputValue("date", isoDate); // Til den lokale form/kladde
                setSelectedDate(date); // Zustand globalt, så andre komponenter kan reagere på den
              }}
              includeDates={locationId ? gyldigeDatoer : []} //viser kun de datoer, der er definret i consten gyldigeDatoer og er tom hvis brugeren ikke har valgt en lokation
              placeholderText="Vælg en dato"
              dateFormat="yyyy-MM-dd"
              className="border border-(--black) p-2 w-full"
            />
          )}
        />
        <p className="text-red-600 text-sm">{errors.dato?.message}</p>
        {gyldigeDatoer.length === 0 && (
          <p className="text-red-600 text-sm mt-2">
            Alle datoer er optaget for den valgte lokation.
          </p>
        )}
        {!selectedLocation && (
          <p className="text-sm text-red-500 mt-1">
            Vælg en lokation før du kan vælge en dato.
          </p>
        )}
      </div>

      {/* KUNSTVÆRKER */}
      <div className="flex flex-col">
        <label>Valgte kunstværker *:</label>
        {selectedLocation && (
          <p className="text-sm text-gray-500">
            {gemteVaerker.length} / {maxArtworks} værker valgt
          </p>
        )}
        {/* <span className="grid gap-2">
            {gemteVaerker
              .filter((art) => art && art.object_number)
              .map((art) => (
                <div key={art.object_number} className="flex items-center justify-between gap-5 py-2">
                  <p className="flex-1">{art.titles?.[0]?.title}</p>
                  <button
                    aria-label="Slet valgte værk"
                    className="hover:text-red-600"
                    onClick={() => sletVaerk(art.object_number)}
                  >
                    <DeleteTrash size={24} />
                  </button>
                </div>
              ))}
          </span> */}

        {/* Skjult input til validering */}
        <input
          aria-label="Vælg kunstværker"
          type="hidden"
          value={
            gemteVaerker.filter((params) => params && params.object_number)
              .length
          }
          {...register("artworkCount", {
            validate: (value) => {
              const count = parseInt(value);
              if (count === 0) return "Du skal vælge mindst ét kunstværk";
            },
          })}
        />
        <p className="text-red-500 text-sm">{errors.artworkCount?.message}</p>
      </div>

      <div className="flex justify-center gap-10">
        <PrimaryButton aria-label="Gem kladde" type="submit">
          Gem kladde
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default Inputs;

//DOKUMENTATION BRUGT

//Form komponent
//https://nextjs.org/docs/app/api-reference/components/form

//routing til ny side ved onclick
//https://nextjs.org/docs/app/api-reference/functions/use-router

//set() og has() syntaks
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has

//Map() constructor
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map

//forståelse for event-handling
//https://www.dhiwise.com/post/e-target-react-exploring-the-power-of-event-handling

//hidden input value
//https://stackoverflow.com/questions/64182981/how-to-preserve-hidden-fields-in-react-hook-form-fieldarray

//setValue fra react hook form
//https://react-hook-form.com/docs/useform/setvalue

//watch fra react hook form
//https://react-hook-form.com/docs/useform/watch

//så brugeren ikke kan vælge datoer, der ikke er gyldige
//date input syntaks:
//https://stackoverflow.com/questions/53252398/how-to-not-let-user-select-past-date-in-input-type-date
//toISOString
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
//split("T")
//https://www.servicenow.com/community/developer-forum/split-date-time/m-p/1611210

//react date picker
//https://www.npmjs.com/package/react-datepicker
//https://reactdatepicker.com/

//og controller
//https://react-hook-form.com/docs/usecontroller/controller

//date constructor
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

//react select
//https://react-select.com/home
