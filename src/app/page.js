import Aabningstider from "@/components/forside/Aabningstider";
import ServerForside from "@/components/forside/ServerForside";
import ParralaxText from "@/components/forside/ParallaxText";

export default function Home({events, art}) {
  return (
    <section className="no-padding">
        <ServerForside art={art} events={events}/>

        <ParralaxText />
        <Aabningstider/>

    </section>
  );
}
