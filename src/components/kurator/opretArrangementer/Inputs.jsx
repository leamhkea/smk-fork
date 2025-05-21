"use client";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import useArtworkStore from "@/store/kuratorStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useArrangementStore from "@/store/arrangementStore";
import Form from 'next/form'
import InventarnummerInput from "./inventarnumreInput";

const Inputs = ({events, art}) => {
  const { setFilter } = useArrangementStore();

  const inputValue = useArtworkStore((state) => state.inputValue);
  const setInputValue = useArtworkStore((state) => state.setInputValue);
  const addEvent = useArtworkStore((state) => state.addEvent);
  const resetInputValue = useArtworkStore((state)=> state.resetInputValue);

  const router = useRouter();

  const [lokation, setLokation] = useState([]);

  useEffect(() => {
    const lokationMap = new Map(); //sørger for der er ingen duplikanter som i set()-constructor, men denne syntaks er ikke kompatibel da jeg ønsker en iterabel metode.

  
    events.forEach((event) => {
      if (event.location && !lokationMap.has(event.location.id)) {
        lokationMap.set(event.location.id, event.location);
      }
    });
    
  
    setLokation([...lokationMap.values()]); //setter alle eksisterende lokationer fra arrayet
  }, [events, art]);
  

  //skaber funktion til at gemme kladder, der returnerer tilbage til funktionen i zustand og resetter value
  const saveKladde = (e) => {
    e.preventDefault();
  
    const eventData = {
      ...inputValue,
      id: crypto.randomUUID(),
    };
  
    console.log("Gemmer kladde:", eventData);
  
    addEvent(eventData);
    resetInputValue();
    router.push("/arrangementer");
  };
  
  

  return (
    <Form onSubmit={saveKladde} className="flex flex-col gap-10">
      <h1 className="thin">Opret arrangement</h1>

      <div className="flex flex-col">
        <label>* Arrangement titel:</label>
        <input required
          type="text"
          name="titel"
          value={inputValue.titel}
          onChange={(e) => setInputValue("titel", e.target.value)} //e.target.value så den peger på feltnavnet fra zustand og ikke funktionen direkte. den får på den måde en callback-funktion og bliver dermed ikke kaldt direkte i render-fasen.
          className="border-1 border-(--black) p-2"
        />
      </div>

      <div className="flex flex-col">
        <label>* Beskrivelse:</label>
        <textarea required
          name="beskrivelse"
          value={inputValue.beskrivelse}
          onChange={(e) => setInputValue("beskrivelse", e.target.value)} 
          className="border-1 border-(--black) p-2 h-50"
        />
      </div>

      <div className="flex flex-col">
        <label>* Lokation:</label>
            <select
            required
            name="lokation"
            value={inputValue.lokation}
            onChange={(e) => { //denne del skal nok opdateres senere, så lokationer videresendes korrekt til resten af delene i projektet
              const value = e.target.value;
              setFilter({ lokation: value }); // til filtrering
              setInputValue("lokation", value); // til kladde
              }}
            className="border-1 border-(--black) p-2"
            >
            <option value="">Vælg lokation</option>
            {lokation.map((lokation, i) => (
             <option key={i} value={lokation.id}>
             {lokation.name} – {lokation.address}
           </option>
            ))}
          </select>
      </div>

      <div className="flex flex-col">
        <label>* Dato:</label>
        <input required
          type="date"
          name="dato"
          value={inputValue.dato}
          onChange={(e) => setInputValue("dato", e.target.value)} 
          className="border-1 border-(--black) p-2"
        />
      </div>

      <div className="flex flex-col">
        <label>Valgte kunstværker:</label>
        <span></span>
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

//required til input
//https://www.w3schools.com/tags/att_input_required.asp

//preventDefault
//https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

//set() og has() syntaks
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has

//Map() constructor
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map

//forståelse for event-handling
//https://www.dhiwise.com/post/e-target-react-exploring-the-power-of-event-handling




//SKAL BRUGES SENERE:

//post til api
//https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations