"use client";
import { useEffect, useState } from "react";
import useArtworkStore from "@/store/kuratorStore";

const Filtrering = ({ artData }) => {
  const { setFilter } = useArtworkStore();

  const [kunstnere, setKunstnere] = useState([]);
  const [tidsperioder, setTidsperioder] = useState([]);
  const [nationaliteter, setNationaliteter] = useState([]);
  const [kunsttyper, setKunsttyper] = useState([]);

  useEffect(() => {
    const artistSet = new Set(); //opretter en ny item til options uden at skabe dublikanter
    const periodSet = new Set();
    const nationalitySet = new Set();
    const typeSet = new Set();

    //for each titel, vis indhold
    artData.forEach((item) => {
      item.artist?.forEach((kunstner) => {
        artistSet.add(kunstner);
      });

      item.production?.forEach((nationalitet) => {
        if (nationalitet.creator_nationality) {
          nationalitySet.add(nationalitet.creator_nationality);
        }
      });

      item.production_date?.forEach((periode) => {
        if (periode.period) {
          periodSet.add(periode.period);
        }
      });

      item.object_names?.forEach((type) => {
        if (type.name) {
          typeSet.add(type.name);
        }
      });
    });

    setKunstnere([...artistSet].sort()); //sorterer arrayet med sort() for at returnere en reference til det tomme array ved useState. 
    setTidsperioder([...periodSet].sort());
    setNationaliteter([...nationalitySet].sort());
    setKunsttyper([...typeSet].sort());
  }, [artData]);

//opdaterer ét flterfelt ad gangen i zustand, bruges til onChange
  const filtreretValue = (field, value) => { 
    setFilter({ [field]: value });
  };

  return (
    <div className="flex justify-between h-10 gap-2">

      {/* kunstner */}
      <select onChange={(e) => filtreretValue("artist", e.target.value)}>
        <option value="">Vælg kunstner</option>
        {kunstnere.map((kunstner, i) => (
          <option key={i} value={kunstner}>
            {kunstner}
          </option>
        ))}
      </select>

      {/* tidsperiode */}
      <select onChange={(e) => filtreretValue("period", e.target.value)}>
        <option value="">Vælg tidsperiode</option>
        {tidsperioder.map((tidsperiode, i) => (
          <option key={i} value={tidsperiode}>
            {tidsperiode}
          </option>
        ))}
      </select>

        {/* kunstart */}
      <select onChange={(e) => filtreretValue("type", e.target.value)}>
        <option value="">Vælg kunstart</option>
        {kunsttyper.map((kunsttype, i) => (
          <option key={i} value={kunsttype}>
            {kunsttype}
          </option>
        ))}
      </select>

        {/* nationalitet */}
      <select onChange={(e) => filtreretValue("nationality", e.target.value)}>
        <option value="">Vælg nationalitet</option>
        {nationaliteter.map((nationalitet, i) => (
          <option key={i} value={nationalitet}>
            {nationalitet}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filtrering;
