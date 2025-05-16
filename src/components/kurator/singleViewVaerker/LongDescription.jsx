"use client";
import { useState, useRef } from "react";

const LongDescriptions = ({ description }) => {
  const [laesmere, setLaesmere] = useState(false);
  const maxLength = 150;

  const sectionRef = useRef(null); // bruger ref i stedet for id

  const isLong = description.length > maxLength;
  const shortText = description.slice(0, maxLength);

  const readMoreToggle = (e) => {
    e.preventDefault();

    const collapsing = laesmere;
    setLaesmere(!laesmere);

    // Scroll kun tilbage hvis vi lukker teksten
    if (collapsing && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex flex-col gap-1 mt-3" ref={sectionRef}>
      <p className="bold">Om kunstneren</p>
      <p>
        {laesmere || !isLong ? description : `${shortText}...`}
        {isLong && (
          <button
            className=" ml-5 underline"
            onClick={readMoreToggle}
          >
            {laesmere ? "Læs mindre" : "Læs mere"}
          </button>
        )}
      </p>
    </div>
  );
};

export default LongDescriptions;


//DOKUMENTATION BRUGT TIL LØSNING:

//Håndtering af scroll tilbage til en sektion
//https://www.reddit.com/r/nextjs/comments/1cmj36z/scroll_to_specific_section/

//preventdefault()-metode
//https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

//useRef
//https://react.dev/reference/react/useRef