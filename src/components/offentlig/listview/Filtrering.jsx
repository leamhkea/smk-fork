"use client";

import { useState, useEffect } from "react";
import useArrangementStore from "@/store/arrangementStore";

const Filtrering = ({ events }) => {
  const { setFilter, allFilters } = useArrangementStore();

  // Sender et tomt objekt som default i useState (vis intet til at starte med)
  const [title, setTitle] = useState([]);
  const [date, setDate] = useState([]);

  // useEffect bruges først når man render siden (afventer handling)
  useEffect(() => {
    // Det er en metode til at oprette en ny titel/dato uden at dublikere
    const titleSet = new Set();
    const dateSet = new Set();

    // ForEach for hver parameter, der er på titel og date.
    // Den skal kigge på det fulde array for event, og tilføje det til listen. Det er de options/select som vises på listview
    events.forEach((event) => {
      if (event.title) titleSet.add(event.title);
      if (event.date) dateSet.add(event.date);
    });

    // Sorterer arrayet med sort() for at returnere en reference til det tomme array ved useState
    setTitle([...titleSet].sort());
    setDate([...dateSet].sort());
  }, [events]);

  // Opdaterer et filterfelt ad gangen i zustand, bruges senere i onchange
  const filteredValue = (field, value) => {
    // Bestemmer det færdige resultat der skal indsættes i dropdown filtre
    setFilter({ [field]: value });
  };

  return (
    <div className="flex justify-end gap-8 mb-15">
      {/* e er et change event parameter, lytter på ændringer (syntaktting) */}
      <select
        aria-label="Vælg arrangement"
        value={allFilters.title}
        onChange={(e) => filteredValue("title", e.target.value)}
      >
        {/* Første default option */}
        <option value="">Vælg arrangement</option>

        {/* Tjekker om title er et array, inden der mappes over det. Sikrer at brugeren ikke får fejl i UI'et, hvis data ikke er tilgængelige. */}
        {title.length > 0 ? (
          title.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))
        ) : (
          // Browser-venlig da den følger <select>-konventionen: value="" betyder "intet valgt"
          <option value="">Ingen titler tilgængelige</option>
        )}
      </select>

      <select
      aria-label="Vælg dato"
        value={allFilters.date}
        onChange={(e) => filteredValue("date", e.target.value)}
      >
        <option value="">Vælg dato</option>
        {date.map((d, i) => (
          <option key={i} value={d}>
            {d}
          </option>
        ))}
      </select>

      {/* Button til at nulstille alle filtre, og få alle arrangementer vist igen */}
      <button aria-label="nultil filtre"
        className="mt-1 ml-6 hover:text-red-600"
        onClick={() => setFilter({ title: "", date: "" })}
      >
        Nulstil filtre
      </button>
    </div>
  );
};

export default Filtrering;
