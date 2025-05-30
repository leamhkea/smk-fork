import HeroImgText from "./HeroImgText";
import PraktiskInfo from "./PraktiskInfo";
import ButtonAddBillet from "./ButtonAddBillet";
import BeskrivendeTekst from "./BeskrivendeTekst";
import SamledeVaerker from "./SamledeVaerker";

const SingleCard = ({ event, art }) => {
  return (
    <article className="grid gap-20">
      {/* =================== IMAGE + OVERSKRIFT ==================== */}
      <HeroImgText event={event} art={art} />

      {/* ===================== OM ARRANGEMENT ====================== */}
      <BeskrivendeTekst event={event} art={art} />

       {/* ================== TILFØJ EVENT TIL KURV ================== */}
       <div className="m-auto">
      <ButtonAddBillet billet={event} art={art} />
      </div>

      {/* ================== PRAKTISK INFORMATION =================== */}
      <PraktiskInfo event={event} />
      {/* ===================== SAMLEDE VÆRKER ====================== */}
      <SamledeVaerker event={event} art={art} />

    </article>
  );
};

export default SingleCard;
