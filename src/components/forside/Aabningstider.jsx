import Ramme from "../global/Ramme";
import ScrollFlow from "../global/ScrollFlow";
import SlideRight from "../global/SlideRight";

const Aabningstider = () => {
  return (
    <ScrollFlow>
    <section className="flex flex-col md:flex-row gap-5 md:gap-20">
      <SlideRight>
      <h1 className="thin">Åbningstider</h1>
      </SlideRight>
      <Ramme className="border-(--blue) border-[5px]">
        <article>
          <div className="flex flex-col justify-end gap-5">
            <ul className="flex flex-col gap-2">
              <li>Tirsdag - Søndag 10:00 - 18:00</li>
              <li>Onsdag 10:00 - 20:00</li>
              <li>Mandag Lukket</li>
            </ul>

            <p>
              Vær opmærksom på, vi begynder at lukke udstillingerne 15 minutter
              før lukketid.
            </p>
            <div className="flex gap-20 mt-5">

            <ul className="flex flex-col gap-2">
              <li>
                <h2>Særåbent i 2025</h2>
              </li>
              <li>10. februar (mandag i vinterferien)</li>
              <li>21. april (2. påskedag)</li>
              <li>9. juni (2. pinsedag)</li>
              <li>13. oktober (mandag i efterårsferien)</li>
              <li>26. december (2. juledag)</li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li>
                <h2>Lukket</h2>
              </li>
              <li>24. december</li>
              <li>25. december</li>
              <li>31. december</li>
              <li>1. januar</li>
            </ul>
          </div>
          </div>
        </article>
      </Ramme>
    </section>
    </ScrollFlow>
  );
};

export default Aabningstider;
