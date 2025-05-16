"use client";

import { SignedIn } from "@clerk/nextjs";
import Kladder from "@/components/kurator/listViewOffentlig/Kladder";
import EventSlider from "./EventSlider";
import Filtrering from "./Filtrering";

const ListClient = (props) => {
  const lokationer = [
    { title: "København", events: props.kobenhavn },
    { title: "Aarhus", events: props.aarhus },
    { title: "Odense", events: props.odense },
    { title: "Aalborg", events: props.aalborg },
    { title: "Esbjerg", events: props.esbjerg },
    { title: "Køge", events: props.koge },
    { title: "Silkeborg", events: props.silkeborg },
    { title: "Lyngby", events: props.lyngby },
    { title: "Holstebro", events: props.holstebro },
  ];

  return (
    <div>
      {/* Denne del vises kun, når man som kurator logger ind */}
      <SignedIn>
        <Kladder />
      </SignedIn>

      {/* Denne del vises for kurator og offentlige brugere */}
      <div className="flex flex-col gap-4 mt-0 mb-20">
        <h1>Alle arrangementer</h1>
        <p>
          For neden vises alle kommende arrangementer på SMK - Statens Museum
          for Kunst.
        </p>
      </div>

      <div>
        <Filtrering events={events} />
      </div>

      {/* Herunder importeres EventSlider, som deler ListCards ud i de 9 lokationer */}
      {lokationer.map(({ title, events }) => (
        <EventSlider key={title} title={title} events={events} />
      ))}
    </div>
  );
};

export default ListClient;
