"use client";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
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
      {isSaved ? <IoHeartSharp size={30} /> : <IoHeartOutline size={30} />}
    </div>
  );
};

export default GemEtVaerkIcon;
