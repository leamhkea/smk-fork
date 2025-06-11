"use client";
//import af egne komponenter
import useArtworkStore from "@/store/kuratorStore";
//imports udefra
import { useEffect, useState } from "react";

const Filtrering = ({ artData }) => {
  //zustand import
  const { setFilter } = useArtworkStore();
  const {gemteVaerker} = useArtworkStore();

  //useState
  const [kunstnere, setKunstnere] = useState([]);
  const [tidsperioder, setTidsperioder] = useState([]);
  const [nationaliteter, setNationaliteter] = useState([]);
  const [kunsttyper, setKunsttyper] = useState([]);
  const [valgteVaerker, setValgteVaerker] = useState([]);

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

      //herunder if-else-statements fordi nogle af items i mit array indeholder null værdier
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
    setValgteVaerker([...gemteVaerker]);
  }, [artData]);

  //opdaterer ét flterfelt ad gangen i zustand, bruges til onChange
  const filtreretValue = (field, value) => {
    setFilter({ [field]: value });
  };

  return (
    <div className="flex md:flex-row gap-10 h-10 justify-between">
      <div className="h-15 md:flex lg:gap-35 md:gap-15">
        {/* kunstner */}
        <select className="md:max-w-40 max-w-30" onChange={(e) => filtreretValue("artist", e.target.value)}>
          <option value="">Vælg kunstner</option>
          {kunstnere.map((kunstner, i) => (
            <option key={i} value={kunstner}>
              {kunstner}
            </option>
          ))}
        </select>

        {/* tidsperiode */}
        <select className="md:max-w-40 max-w-30" onChange={(e) => filtreretValue("period", e.target.value)}>
          <option value="">Vælg tidsperiode</option>
          {tidsperioder.map((tidsperiode, i) => (
            <option key={i} value={tidsperiode}>
              {tidsperiode}
            </option>
          ))}
        </select>
      </div>

      <div className="h-15 md:flex lg:gap-35 md:gap-15">
        {/* kunstart */}
        <select className="md:max-w-40 max-w-30" onChange={(e) => filtreretValue("type", e.target.value)}>
          <option value="">Vælg kunstart</option>
          {kunsttyper.map((kunsttype, i) => (
            <option key={i} value={kunsttype}>
              {kunsttype}
            </option>
          ))}
        </select>

        {/* nationalitet */}
        <select className="md:max-w-40 max-w-30" onChange={(e) => filtreretValue("nationality", e.target.value)}>
          <option value="">Vælg nationalitet</option>
          {nationaliteter.map((nationalitet, i) => (
            <option key={i} value={nationalitet}>
              {nationalitet}
            </option>
          ))}
        </select>

        {/* gemte værker */}
        <button
          className="hover:scale-105 transition-all duration-300"
          onClick={() => filtreretValue("inventarnr", valgteVaerker.map(v => v.inventarnummer))}
        >
          Vis valgte værker
        </button>
      </div>
    </div>
  );
};

export default Filtrering;

//DOKUMENTATION BRUGT

//set() constructor
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set

//add() prop
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add

//forståelse for key-prop
//https://medium.com/@ishaqibrahimbss/reacts-favorite-warning-each-child-in-a-list-should-have-a-unique-key-prop-909dfe50cbe3
