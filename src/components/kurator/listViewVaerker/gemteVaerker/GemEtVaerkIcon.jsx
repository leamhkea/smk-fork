"use client";
import useArtworkStore from "@/store/kuratorStore";

const GemEtVaerkIcon = ({children, gemteVaerker}) => {
const addVaerk = useArtworkStore((state)=>state.addVaerk)
    return ( <div className="relative top-15 left-5" onClick={()=>addVaerk(gemteVaerker)}>
        {children}
    </div> );
}
 
export default GemEtVaerkIcon;