import KurvCard from "./KurvCard";
import { useState, useEffect } from "react";

const KurvPopover = ({ event }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Når popover vises, opdateres animationen
  useEffect(() => {
    setIsVisible(true);
  }, []); // kører kun én gang, når komponenten mountes

  return (
    <div
      className={`fixed top-20 right-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 min-h-screen bg-(--white) shadow-lg z-1 transition-transform duration-500 ease-out 
      ${isVisible ? "translate-x-0" : "translate-x-full"}`}
    >
      <KurvCard />
    </div>
  );
};

export default KurvPopover;
