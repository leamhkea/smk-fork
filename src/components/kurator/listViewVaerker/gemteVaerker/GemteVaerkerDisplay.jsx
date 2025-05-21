// "use client";
// import useArtworkStore from "@/store/kuratorStore";
// import { useState, useEffect } from "react";
// import GemteVaerkerCard from "./GemteVaerkerCard";
// import SecondaryButton from "@/components/global/buttons/SecondaryButton";

// const GemteVaerkerDisplay = ({onClose}) => {
//     const [isVisible, setIsVisible] = useState(false);

//     const {gemteVaerker}=useArtworkStore((state)=>state);
//     const vaerkSum = useArtworkStore((state) => state.vaerkSum());
//     const emptyGemteVaerker = useArtworkStore((state) => state.emptyGemteVaerker);

//     useEffect(()=>{
//         setIsVisible(true);
//     },[]);

//     const handleClose=()=>{
//       setIsVisible(false);

//       setTimeout(()=>{
//         if(onClose) onClose();
//       },500);
//     };

//     return ( <div className={`px-10 pb-30 fixed right-0 w-full sm:w-2/3 lg:w-1/2 h-screen bg-(--white) shadow-lg z-1 transition-transform duration-500 ease-out flex flex-col
//       ${isVisible ? "translate-x-0" : "translate-x-full"}`}>

//       <div className="flex-1 overflow-y-auto">
//       <div className="pb-16 pt-4">
//       <p>Mine gemte værker ({vaerkSum})</p>
//       <hr/>
//       </div>
    
//         <div className="flex-1">
//           {gemteVaerker.filter(v => v && v.object_number).length > 0 ? ( //filtrerer null-items fra api'et væk
//             gemteVaerker
//               .filter((vaerk) => vaerk && vaerk.object_number)
//               .map((vaerk) => (
//                 <GemteVaerkerCard key={vaerk.object_number} vaerk={vaerk} />
//               ))
//           ) : (
//             <p>Du har ingen gemte værker</p>
//           )}
//         </div>
//       </div>
    
//       <div className="flex px-8 gap-8">
//         <SecondaryButton onClick={()=>{emptyGemteVaerker(); handleClose();}}>Fjern alle gemte værker</SecondaryButton>
//       </div>
//     </div>
//     );
// }
 
// export default GemteVaerkerDisplay;