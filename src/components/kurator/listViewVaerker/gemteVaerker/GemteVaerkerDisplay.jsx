"use client";
import useArtworkStore from "@/store/kuratorStore";
import { useState, useEffect } from "react";
import GemteVaerkerCard from "./GemteVaerkerCard";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";

const GemteVaerkerDisplay = () => {
    const [isVisible, setIsVisible] = useState(false);
    const {gemteVaerker}=useArtworkStore((state)=>state);
    const vaerkSum = useArtworkStore((state) => state.vaerkSum());
    const emptyGemteVaerker = useArtworkStore((state) => state.emptyGemteVaerker);

    useEffect(()=>{
        setIsVisible(true);
    },[]);

    return ( <div className={`fixed top-20 right-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 min-h-screen bg-(--white) shadow-lg z-1 transition-transform duration-500 ease-out 
      ${isVisible ? "translate-x-0" : "translate-x-full"}`}>
      
      <div className="p-10 overflow-y-auto grid gap-8">
        <p>Mine gemte værker ({vaerkSum})</p>
    
        <div className="flex-1s">
          {gemteVaerker.filter(v => v && v.object_number).length > 0 ? ( //filtrerer null-items fra api'et væk
            gemteVaerker
              .filter((vaerk) => vaerk && vaerk.object_number)
              .map((vaerk) => (
                <GemteVaerkerCard key={vaerk.object_number} vaerk={vaerk} />
              ))
          ) : (
            <p>Du har ingen gemte værker</p>
          )}
        </div>
      </div>
    
      <div className="flex px-8 gap-8">
        <SecondaryButton onClick={emptyGemteVaerker}>Fjern alle gemte værker</SecondaryButton>
      </div>
    </div>
    );
}
 
export default GemteVaerkerDisplay;