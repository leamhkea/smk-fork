// "use client";
// import SecondaryButton from "@/components/global/buttons/SecondaryButton";
// import useArtworkStore from "@/store/kuratorStore";

// const GemEtVaerkButton = ({ vaerk }) => {
//   const gemteVaerker = useArtworkStore((state) => state.gemteVaerker);
//   const addVaerk = useArtworkStore((state) => state.addVaerk); 


//   const isSaved = gemteVaerker.some(
//     (item) => item?.object_number === vaerk.object_number
//   );

//   const addGemtVaerk = () => {
//     if (!isSaved) {
//       addVaerk({ ...vaerk, antal: 1 });
//     }
//   };

//   return (
//       <SecondaryButton onClick={addGemtVaerk} disabled={isSaved}>
//         {isSaved ? "Værk gemt" : "Gem værk"}
//       </SecondaryButton>
//   );
// };

// export default GemEtVaerkButton;
