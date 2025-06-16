"use client";

import EventSlider from "./EventSlider";
import Filtrering from "./Filtrering";
import ListKladder from "@/components/kurator/kladder/ListKladder";
import GoBackArrow from "@/components/global/buttons/GoBackArrow";
import useArrangementStore from "@/store/arrangementStore";
import { useEffect } from "react";
import { SignedIn } from "@clerk/nextjs";

const ListClient = (props) => {
  // Funktion til at sætte listen af arrangementer i global state
  const { setArrangementer } = useArrangementStore();

  // En filtreret version af arrangementerne
  const { visteArrangementer = [] } = useArrangementStore();

  // Når komponenten får nye events fra props, sørg for at opdatere den globale tilstand (Zustand) med disse events, så resten af applikationen kan reagere på dem.
  useEffect(() => {
    if (props.events) {
      setArrangementer(props.events); // sørger for, at man kun opdaterer Zustand-store, hvis events faktisk er der
    }
  }, [props.events, setArrangementer]); // sørger for at effekten kører, hver gang events ændrer sig

  // Definerer lokationerne manuelt
  const lokationer = [
    "København",
    "Aarhus",
    "Odense",
    "Aalborg",
    "Esbjerg",
    "Køge",
    "Silkeborg",
    "Lyngby",
    "Holstebro",
  ];

  // For hver by filtreres visteArrangementer, og kun events med matchende address tilføjes
  const grupperetEfterLokation = lokationer.map((by) => {
    const byEvents = visteArrangementer.filter((event) =>
      event.location?.address.includes(by)
    );

    // Resultatet bliver en liste. Alle events der matcher byens navn bliver lagt i byEvents
    return {
      title: by,
      events: byEvents,
    };
  });

  // Bruges til at vise en besked, hvis der ikke findes nogen events i nogen af byerne
  // every() returnerer true, hvis ALLE grupper har events.length === 0
  const alleEventsErTom = grupperetEfterLokation.every(
    (gruppe) => gruppe.events.length === 0
  );

  return (
    <div>
      <GoBackArrow />
      <SignedIn>
        <ListKladder art={props.art} />
      </SignedIn>

      {/* =================== OPLYSNINGER OM SMK ARRANGEMENTER ==================== */}
      <h1>Alle arrangementer</h1>

      <div className="flex flex-row flex-wrap justify-between mt-10 mb-20 gap-8">
        <div className="grid gap-2 max-w-2xl">
          <p>
            SMK byder løbende på et væld af arrangementer, hvor kunst, kultur og
            fællesskab mødes.
          </p>
          <p>
            Arrangementerne henvender sig til både børn og voksne og spænder fra
            det afslappede og sanselige til det mere dybdegående og fordybende.
          </p>
          <p>
            Uanset om du er førstegangsbesøgende eller erfaren kunstelsker, er
            der noget for enhver smag. Alle arrangementer, som vises her på
            siden, kræver billet og kan bestilles på det enkelte arrangement.
          </p>
        </div>

        {/* ========================= FILTRE TIL EVENTS =========================== */}
        <Filtrering className="self-end" events={props.events} />
      </div>

      {/* Turnary at vise hvis der INGEN arrangementer er til filtre */}
      {alleEventsErTom && (
        <p className="text-center py-50 text-gray-500 italic">
          Der blev ikke fundet nogen arrangementer med de valgte filtre.
        </p>
      )}

      {/* For hver by, der har events, vises et EventSlider-komponent med events fra den by */}
      {grupperetEfterLokation
        .filter((gruppe) => gruppe.events.length > 0)
        .map(({ title, events }) => (
          <EventSlider
            key={title}
            title={title}
            events={events}
            art={props.art}
          />
        ))}
    </div>
  );
};

export default ListClient;

// 1. Modtager events fra props.
// 2. Gemmer dem i en global Zustand-store.
// 3. Filtrerer dem efter byer.
// 4. Viser filtre og info.
// 5. Viser events opdelt i byer i EventSlider.
// 6. Viser en besked hvis ingen events matcher filtrene.
// 7. Viser ekstra indhold (kladder) for indloggede brugere.
