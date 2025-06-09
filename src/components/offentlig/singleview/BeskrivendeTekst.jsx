import ScrollFlow from "@/components/global/ScrollFlow";
// hej

const BeskrivendeTekst = ({ event, art }) => {
  return (
    <ScrollFlow>
      <div className="flex justify-between gap-5 max-w-[50rem] mx-auto">
        <h2 className="w-1/2 break-words pb-2 self">Om {event.title}</h2>
        <div className="w-2/2 break-words grid gap-2">
          <p>
            Dette arrangement er
            {event.description}
          </p>
          <p>
            Arrangementet tilbyder en indbydende og inspirerende atmosfære, hvor
            kunst og arkitektur smelter sammen for at skabe en unik oplevelse.
          </p>
        </div>
      </div>
    </ScrollFlow>
  );
};

export default BeskrivendeTekst;
