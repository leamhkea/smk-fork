import HeroImgText from "./HeroImgText";
import PraktiskInfo from "./PraktiskInfo";
import ButtonAddBillet from "./ButtonAddBillet";

const SingleCard = ({ event, art }) => {
  return (
    <article className="grid gap-40">
      {/* =================== IMAGE + OVERSKRIFT ==================== */}
      <HeroImgText event={event} art={art} />

      {/* ===================== OM ARRANGEMENT ====================== */}
      <div className="flex justify-between max-w-[50rem] mx-auto">
        <h2 className="w-1/2 break-words pb-2 self">Om {event.title}</h2>
        <div className="w-1/2 break-words grid gap-2">
          <p>
            Dette arrangement omhandler
            <span className="text-(--blue) px-1">{event.description}</span>
          </p>
          <p>
            Arrangementet tilbyder en indbydende og inspirerende atmosfære, hvor
            kunst og arkitektur smelter sammen for at skabe en unik oplevelse.
          </p>
        </div>
      </div>

      {/* ================== PRAKTISK INFORMATION =================== */}
      <PraktiskInfo event={event} />

      {/* ================== TILFØJ EVENT TIL KURV ================== */}
      <ButtonAddBillet billet={event} art={art} />
    </article>
  );
};

export default SingleCard;
