"use client";

import { useEffect } from "react";
import useArrangementStore from "@/store/arrangementStore";
import { SignedIn } from "@clerk/nextjs";
import ListKladder from "@/components/kurator/listViewOffentlig/ListKladder";
import EventSlider from "./EventSlider";
import Filtrering from "./Filtrering";

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
      <SignedIn>
        <ListKladder art={props.art} />
      </SignedIn>

      <div className="flex flex-col gap-4 mt-0 mb-20">
        <h1>Alle arrangementer</h1>
        <p>
          For neden vises alle kommende arrangementer på SMK - Statens Museum
          for Kunst.
        </p>
      </div>

      <Filtrering events={props.events} />

      {alleEventsErTom && (
        <p className="text-center py-50 text-gray-500 italic">
          Der blev ikke fundet nogen arrangementer med de valgte filtre.
        </p>
      )}

      {grupperetEfterLokation
        .filter((gruppe) => gruppe.events.length > 0)
        .map(({ title, events }) => (
          <EventSlider key={title} title={title} events={events} art={props.art} />
        ))}
    </div>
  );
};

export default ListClient;
