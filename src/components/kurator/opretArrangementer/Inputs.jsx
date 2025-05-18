"use client";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import useArtworkStore from "@/store/kuratorStore";
import { useRouter } from "next/navigation";

const Inputs = () => {
  const inputValue = useArtworkStore((state) => state.inputValue);
  const setInputValue = useArtworkStore((state) => state.setInputValue);
  const addEvent = useArtworkStore((state) => state.addEvent);
  const resetInputValue = useArtworkStore((state)=> state.resetInputValue);

  //skaber funktion til at gemme kladder, der returnerer tilbage til funktionen i zustand og resetter value
  const saveKladde = () => {
    addEvent();
    resetInputValue();
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="thin">Opret arrangement</h1>

      <div className="flex flex-col">
        <label>Arrangement titel:</label>
        <input
          type="text"
          name="titel"
          value={inputValue.titel}
          onChange={(e) => setInputValue("titel", e.target.value)} //e.target.value så den peger på feltnavnet fra zustand og ikke funktionen direkte. den får på den måde en callback-funktion og bliver dermed ikke kaldt direkte i render-fasen.
          className="border-1 border-(--black) p-2"
        />
      </div>

      <div className="flex flex-col">
        <label>Beskrivelse:</label>
        <textarea
          name="beskrivelse"
          value={inputValue.beskrivelse}
          onChange={(e) => setInputValue("beskrivelse", e.target.value)} 
          className="border-1 border-(--black) p-2 h-50"
        />
      </div>

      <div className="flex flex-col">
        <label>Lokation:</label>
        <select
          name="lokation"
          value={inputValue.lokation}
          onChange={(e) => setInputValue("lokation", e.target.value)} 
          className="border-1 border-(--black) p-2"
        >
          <option value="">Vælg lokation</option>
          <option value="kbh">København</option>
          <option value="aarhus">Aarhus</option>
          <option value="odense">Odense</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label>Dato:</label>
        <input
          type="date"
          name="dato"
          value={inputValue.dato}
          onChange={(e) => setInputValue("dato", e.target.value)} 
          className="border-1 border-(--black) p-2"
        />
      </div>

      <div className="flex flex-col">
        <label>Inventarnummer:</label>
        <input
          type="text"
          name="inventarnummer"
          value={inputValue.inventarnummer}
          onChange={(e) => setInputValue("inventarnummer", e.target.value)} 
          placeholder="Eksempel: KKSgb18, KKS1997-4"
          className="border-1 border-(--black) p-2"
        />
      </div>

      <div className="flex justify-center gap-10">
        <SecondaryButton onClick={saveKladde}>Gem kladde</SecondaryButton>
        <TertrieryButton>Publicer arrangement</TertrieryButton>
      </div>
    </div>
  );
};

export default Inputs;

//DOKUMENTATION BRUGT

//routing til ny side ved onclick
//https://nextjs.org/docs/app/api-reference/functions/use-router