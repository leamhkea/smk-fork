import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import Ramme from "@/components/global/Ramme";
import ServerForside from "@/components/forside/ServerForside";
import ParralaxText from "@/components/forside/ParallaxText";


export default function Home({events, art}) {
  return (
    <section className="no-padding">
        <ServerForside art={art} events={events}/>

      <div>
        <ParralaxText />
      </div>
      <div className="mt-20 flex gap-20">
      <h1 className="thin">Åbningstider</h1>
        <Ramme>
          <article>
            <div className="flex flex-col justify-end gap-5">
              <ul className="flex flex-col gap-2">
                <li>Tirsdag - Søndag 10:00 - 18:00</li>
                <li>Onsdag 10:00 - 20:00</li>
                <li>Mandag Lukket</li>
              </ul>
              <p>
                Vær opmærksom på, vi begynder at lukke udstillingerne 15
                minutter før lukketid.
              </p>
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
          </article>
        </Ramme>
      </div>
    </section>
  );
}
