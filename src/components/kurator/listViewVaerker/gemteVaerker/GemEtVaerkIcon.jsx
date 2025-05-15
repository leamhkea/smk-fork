"use client";
import HeartIconActive from "@/components/global/ikoner/HeartIconActive";
import HeartIconInactive from "@/components/global/ikoner/HeartIconInactive";
import useArtworkStore from "@/store/kuratorStore";


const GemEtVaerkIcon = ({ vaerk }) => {
  const gemteVaerker = useArtworkStore((state) => state.gemteVaerker);
  const addVaerk = useArtworkStore((state) => state.addVaerk);
  const sletVaerk = useArtworkStore((state) => state.sletVaerk);

  const isSaved = gemteVaerker.some(
    (item) => item?.object_number === vaerk.object_number
  );
  
  const handleSavedToggle = () => {
    if (isSaved) {
      sletVaerk(vaerk.object_number);
    } else {
      addVaerk(vaerk);
    }
  };


  return (
    <div
      className="relative top-15 left-5 cursor-pointer"
      onClick={handleSavedToggle}
    >
      {isSaved ? <HeartIconActive /> : <HeartIconInactive />}
    </div>
  );
};

export default GemEtVaerkIcon;
