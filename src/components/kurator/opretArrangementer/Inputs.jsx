"use client";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import useArtworkStore from "@/store/kuratorStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useArrangementStore from "@/store/arrangementStore";
import { useForm } from "react-hook-form";
import Form from "next/form";

const Inputs = ({ events, art }) => {
  const { setFilter } = useArrangementStore();
  const { gemteVaerker } = useArtworkStore((state) => state);
  const resetVaerker = useArtworkStore((state) => state.resetVaerker);
  const inputValue = useArtworkStore((state) => state.inputValue);
  const setInputValue = useArtworkStore((state) => state.setInputValue);
  const addEvent = useArtworkStore((state) => state.addEvent);
  const resetInputValue = useArtworkStore((state) => state.resetInputValue);
  const setSelectedLocation = useArtworkStore(
    (state) => state.setSelectedLocation
  );

  const router = useRouter();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm();

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
    const lokationMap = new Map(); //sørger for der er ingen duplikanter som i set()-constructor, men denne syntaks er ikke kompatibel da jeg ønsker en iterabel metode.

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
  //se gemEtVaerkIcon (komponent) og kuratorStore - sørger for at man ikke kan klikke på flere ved maxArtworks

  //GEMMER KLADDE//

  const saveKladde = () => {
    //tilføjer event til kladder
    addEvent({
      ...inputValue,
      artworkIds: gemteVaerker.map((v) => v.object_number), //object_number fra smk api
    });

    //reset fra zustand ved lykket submission
    resetInputValue();
    resetVaerker();
    router.push("/arrangementer"); //navigerer til kladder ved lykket submission
  };

  return (
    <Form onSubmit={handleSubmit(saveKladde)} className="flex flex-col gap-10">
      <h1 className="thin">Opret arrangement</h1>

      {/* TITEL */}
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Arrangement titel *"
          {...register("titel", { required: "Titel er påkrævet" })}
          defaultValue={inputValue.title}
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
          placeholder="Beskrivelse *"
          {...register("beskrivelse", {
            required: "Beskrivelse er påkrævet",
            maxLength: {
              value: 400,
              message: "Beskrivelse må max bestå af 400 karakterer",
            },
          })}
          defaultValue={inputValue.description}
          className="border-1 border-(--black) p-2 h-50"
          onChange={(e) => {
            setValue("beskrivelse", e.target.value); // React Hook Form
            setInputValue("description", e.target.value); // Zustand
          }}
        />
        <p className="text-red-600 text-sm">{errors.beskrivelse?.message}</p>
      </div>

      {/* LOKATION */}
      <div className="flex flex-col">
        <select
          {...register("locationId", { required: "Lokation er påkrævet" })}
          defaultValue={inputValue.location?.id}
          className="border-1 border-(--black) p-2"
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedLocation = lokation.find(
              (params) => params.id === selectedId
            ); //matcher lokationen med id
            if (selectedLocation) {
              setFilter({ lokation: selectedId }); //til filtrering
              setValue("locationId", selectedId); // Syncer med react-hook-form og setter value korrekt
              setInputValue("location", selectedLocation); // Zustand
              setSelectedLocation(selectedLocation);
            }
          }}
        >
          <option value="">Vælg lokation *</option>
          {lokation.map((lokation, i) => (
            <option key={i} value={lokation.id}>
              {lokation.name} – {lokation.address}
            </option>
          ))}
        </select>
        <p className="text-red-600 text-sm">{errors.locationId?.message}</p>
      </div>

      {/* DATO */}
      <div className="flex flex-col">
        <input
          type="date"
          {...register("dato", { 
            required: "Dato er påkrævet"})}
          defaultValue={inputValue.date}
          className="border-1 border-(--black) p-2"
          onChange={(e) => {
            setValue("dato", e.target.value); // React Hook Form
            setInputValue("date", e.target.value); // Zustand
          }}
        />
        <p className="text-red-600 text-sm">{errors.dato?.message}</p>
      </div>

      {/* KUNSTVÆRKER */}
      <div className="flex flex-col">
        <label>Valgte kunstværker *:</label>
        {selectedLocation && (
          <p className="text-sm text-gray-500">
            {gemteVaerker.length} / {maxArtworks} værker valgt
          </p>
        )}
        <span className="grid gap-2">
          {gemteVaerker
            .filter((art) => art && art.object_number)
            .map((art) => (
              <p key={art.object_number}>{art.titles?.[0]?.title}</p> //viser titlen på værket i stedet for object_number
            ))}
        </span>

        {/* Skjult input til validering */}
        <input
          type="hidden"
          value={
            gemteVaerker.filter((params) => params && params.object_number)
              .length
          }
          {...register("artworkCount", {
            validate: (value) => {
              const count = parseInt(value);
              if (count === 0) return "Du skal vælge mindst ét kunstværk";
              if (count > maxArtworks)
                return `Maksimalt ${maxArtworks} værker tilladt for denne lokation`;
              return true;
            },
          })}
        />
        <p className="text-red-600 text-sm">{errors.artworkCount?.message}</p>
      </div>

      <div className="flex justify-center gap-10">
        <SecondaryButton type="submit">Gem kladde</SecondaryButton>
        <TertrieryButton>Publicer arrangement</TertrieryButton>
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

//så brugeren ikke kan vælge en dato i fortiden
//date input syntaks:
//https://stackoverflow.com/questions/53252398/how-to-not-let-user-select-past-date-in-input-type-date
//toISOString
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
//split("T")
//https://www.servicenow.com/community/developer-forum/split-date-time/m-p/1611210
