import Ramme from "@/components/global/Ramme";

const PraktiskInfo = ({ event }) => {
  const ledigeBilletter = event.totalTickets - event.bookedTickets;

  return (
    <Ramme className="border-[5px] p-5 border-(--blue)">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        {/* ========================= LOKATION ======================= */}
        <div>
          <h2 className="pb-2">Lokation</h2>
          <p>
            Adressen for arrangementet på Statens Museum for Kunst er
            {event.location.address}
            og foregår på lokationen
            {event.location.name}.
          </p>
        </div>

        {/* =========================== DATO ========================== */}
        <div>
          <h2 className="pb-2">Dato</h2>
          <p>
            Arrangementet kommer til at foregå d.
            {event.date}
            fra kl. 12.00 – 16.00, hvortil der tilbydes drikkelse og snacks.
          </p>
        </div>

        {/* =================== LEDIGE BILLETTER ====================== */}
        <div>
          <h2 className="pb-2">Ledige billetter</h2>
          <p>
            Der er
            {ledigeBilletter}
            billetter tilbage til arrangementet. Der tilbydes i alt op til
            {event.totalTickets}
            gæster.
          </p>
        </div>

        {/* =========================== PRIS ========================== */}
        <div>
          <h2 className="pb-2">Pris</h2>
          <p>
            Dette arrangement er gratis, så du/I kan med fordel se frem til en
            dag fyldt med oplevelser og kulturelle kunstværker, uden at det
            koster jer noget.
          </p>
        </div>
      </div>
    </Ramme>
  );
};

export default PraktiskInfo;
