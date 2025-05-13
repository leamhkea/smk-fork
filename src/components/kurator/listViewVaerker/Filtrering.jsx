"use client";
import { useEffect, useState } from "react";
import useArtworkStore from "@/store/kuratorStore";

const Filtrering = ({ artData }) => {
  const { setFilter } = useArtworkStore();

  const [artists, setArtists] = useState([]); //skal sættes som tomt objekt, ellers er det ikke muligt at mappe over, da den ikke har en standard værdi (i dette tilfælde tomt, så alle værker vises)
  const [periods, setPeriods] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [artTypes, setArtTypes] = useState([]);

  useEffect(() => { //useEffect er nødvendig for at arbejde med dataen udenfor den normale render-proces, og bliver derfor først "aktiv" når artData er tilgængelig. Derfra kan kan setArtists (osv.) opdatere sin state
    const artistSet = new Set(); //Set() bruges til at sikre, at hver dropdown kun indeholder unikke værdier fra dataen (f.eks. kunstnernavne uden dubletter).
    const periodSet = new Set();
    const nationalitySet = new Set();
    const artTypeSet = new Set();

    //forEach over hver af de forskellige items ved at kalde på hver parameter
    artData.forEach((item) => {
      item.content_person_full?.forEach((person) => { //nationalitet og full name er samlet eftersom begge ligger i arrayet "content_person_full"
        if (person.full_name) artistSet.add(person.full_name);
        if (person.nationality) nationalitySet.add(person.nationality);
      });

      item.production_date?.forEach((periode) => {
        if (periode.period) periodSet.add(periode.period);  //hvis parametret svarer til det valgte i select, tilføj til listview
      });

      item.object_names?.forEach((kunsttype) => {
        if (kunsttype.name) artTypeSet.add(kunsttype.name);
      });
    });

    setArtists([...artistSet].sort()); //sort muterer arrayet og returnerer en reference til samme array. Der bruges spreading til at blive sorteret efter hver type, der er gemt som set() (og dermed unikt) gennem useEffect
    setPeriods([...periodSet].sort());
    setNationalities([...nationalitySet].sort());
    setArtTypes([...artTypeSet].sort());
  }, [artData]);

  const filtreretValue = (field, value) => {
    setFilter({ [field]: value }); //kalder denne funktion ved onChange, så listens values (fra API'et), vises i dropdownen uafhængig af field
  };

  return (
    <div className="flex justify-between h-10">
      <select onChange={(e) => filtreretValue("artist", e.target.value)}> 
        <option value="">Vælg kunstner</option> {/* default value="", giver brugeren mulighed for at nulstille søgningen */}
        {artists.map((artist, i) => (
          <option key={i} value={artist}> {/* // i = index, bruges som key og finder forskellige antal af muligheder*/}
            {artist}
          </option>
        ))}
      </select> 
 
      <select onChange={(e) => filtreretValue("period", e.target.value)}>
        <option value="">Vælg tidsperiode</option> 
        {periods.map((period, i) => (
          <option key={i} value={period}> 
            {period}
          </option>
        ))} 
      </select>

      <select onChange={(e) => filtreretValue("type", e.target.value)}>
        <option value="">Vælg kunstart</option> 
        {artTypes.map((type, i) => (
          <option key={i} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select onChange={(e) => filtreretValue("nationality", e.target.value)}>
        <option value="">Vælg nationalitet</option>
        {nationalities.map((nat, i) => (
          <option key={i} value={nat}>
            {nat}
          </option>
        ))}
      </select>
    </div>
  );
}; 

export default Filtrering;
