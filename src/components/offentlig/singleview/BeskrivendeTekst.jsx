const BeskrivendeTekst = ({ event, art }) => {
  return (
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
  );
};

export default BeskrivendeTekst;
