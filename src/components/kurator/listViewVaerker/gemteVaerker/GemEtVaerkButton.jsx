"use client";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import useArtworkStore from "@/store/kuratorStore";
import GemteVaerkerDisplay from "./GemteVaerkerDisplay";
import { useState, useRef } from "react";
import { useClickAway } from "react-use";

const GemEtVaerkButton = ({ vaerk }) => {
  const gemteVaerker = useArtworkStore((state) => state.gemteVaerker);
  const addVaerk = useArtworkStore((state) => state.addVaerk); 

  const [showMenu, setShowMenu]=useState(false);
  const toggleMenu = ()=>{
    setShowMenu((prev)=>!prev);
  }

  const menuRef = useRef(null);

  useClickAway(menuRef, () => {
    setShowMenu(false);
  });

  const isSaved = gemteVaerker.some(
    (item) => item?.object_number === vaerk.object_number
  );

  const addGemtVaerk = () => {
    if (!isSaved) {
      addVaerk({ ...vaerk, antal: 1 });
    }
  };

  return (
    <div ref={menuRef} onClick={toggleMenu}>
      <SecondaryButton onClick={addGemtVaerk} disabled={isSaved}>
        {isSaved ? "Værk gemt" : "Gem værk"}
      </SecondaryButton>
      {showMenu && <GemteVaerkerDisplay/>}
      </div>
  );
};

export default GemEtVaerkButton;
