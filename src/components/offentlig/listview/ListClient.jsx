"use client";

import { useEffect } from "react";
import useArrangementStore from "@/store/arrangementStore";
import { SignedIn } from "@clerk/nextjs";
import ListKladder from "@/components/kurator/kladder/ListKladder";
import EventSlider from "./EventSlider";
import Filtrering from "./Filtrering";
import GoBackArrow from "@/components/global/buttons/GoBackArrow";

const ListClient = (props) => {
  const { setArrangementer } = useArrangementStore();
  const { visteArrangementer = [] } = useArrangementStore();

  useEffect(() => {
    if (props.events) {
      setArrangementer(props.events);
    }
  }, [props.events, setArrangementer]);

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

  const grupperetEfterLokation = lokationer.map((by) => {
    const byEvents = visteArrangementer.filter((event) =>
      event.location?.address.includes(by)
    );

    return {
      title: by,
      events: byEvents,
    };
  });

  const alleEventsErTom = grupperetEfterLokation.every(
    (gruppe) => gruppe.events.length === 0
  );

  return (
    <div>
      <GoBackArrow/>
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

        {/* ======================= FILTRE TIL EVENTS ======================== */}
        <Filtrering className="self-end" events={props.events} />
      </div>

      {alleEventsErTom && (
        <p className="text-center py-50 text-gray-500 italic">
          Der blev ikke fundet nogen arrangementer med de valgte filtre.
        </p>
      )}

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
