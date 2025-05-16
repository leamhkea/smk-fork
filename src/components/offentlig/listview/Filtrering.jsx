"use client";

import { useState, useEffect, use } from "react";
import useArrangementStore from "@/store/arrangementStore";

const Filtrering = ({ event }) => {
  // OBS OBS Bruger som en funktion og ikke som prop / const
  const { setFilter } = useArrangementStore();

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
    event.forEach((parameter) => {
      parameter.title?.forEach((titleParameter) => {
        titleSet.add(titleParameter);
      });

      parameter.date?.forEach((dateParameter) => {
        dateSet.add(dateParameter);
      });
    });

    // Sorterer arrayet med sort() for at returnere en reference til det tomme array ved useState
    setTitle([...titleSet].sort());
    setDate([...dateSet].sort());
  }, [event]);

  // Opdaterer et filterfelt ad gangen i zustand, bruges senere i onchange
  const filteredValue = (field, value) => {
    // Bestemmer det færdige resultat der skal indsættes i dropdown filtre
    setFilter({ [field]: value });
  };

  return (
    <div>
      {/* e er et change event parameter, lytter på ændringer (syntaktting) */}
      <select onChange={(e) => filteredValue("placeholder", e.target.value)}>
        <option value="">Vælg arrangement</option>
        {title.map((titleParameter, i) => (
          // Option får en key for at tildele unikt id, kalder value for den const som blev forEachet gennem data
          <option key={i} value={titleParameter}>
            {title}
          </option>
        ))}
      </select>

      {/* Det samme med date */}
      <select onChange={(e) => filteredValue("placeholder", e.target.value)}>
        <option value="">Vælg arrangement</option>
        {date.map((dateParameter, i) => (
          // Option får en key for at tildele unikt id, kalder value for den const som blev forEachet gennem data
          <option key={i} value={dateParameter}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filtrering;
