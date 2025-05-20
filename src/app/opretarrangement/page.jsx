import Inputs from "@/components/kurator/opretArrangementer/Inputs";
import { filterHasImage } from "@/librery/artworkUtils";

const OpretArrangement = async () => {
  const [dataAsync, dataSMK] = await Promise.all([
    fetch("https://async-exhibit-server-rmug.onrender.com/events/"),

    fetch(
      "https://api.smk.dk/api/v1/art/search/?keys=*&offset=80000&rows=2000"

    ),
  ]) 

  const [events, artData] = await Promise.all([dataAsync.json(), dataSMK.json()]);

  const art = filterHasImage(artData.items);

  return (
    <section className="flex flex-col gap-10 px-[--content-width]">
      <Inputs events={events} art={art} />
    </section>
  );
};

export default OpretArrangement;
