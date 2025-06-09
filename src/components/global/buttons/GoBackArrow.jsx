import { CgArrowLongLeft } from "react-icons/cg";
import SlideRight from "../SlideRight";

const GoBackArrow = () => {
  const goBack = () => {
    history.back(); 
  };

  return (
    <SlideRight>
    <button aria-label="Gå tilbage" className="pl-5 pb-5 hover:scale-105 transition-all duration-300" onClick={goBack}>
      <CgArrowLongLeft size={40} />
    </button>
    </SlideRight>
  );
};

export default GoBackArrow;

//DOKUMENTATION BRUGT

//history.back()
//https://developer.mozilla.org/en-US/docs/Web/API/History/back
