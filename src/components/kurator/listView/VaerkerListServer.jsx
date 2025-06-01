import VaerkerListClient from "./VaerkerListClient";
import { filterHasImage } from "@/store/artworkUtils";

const VaerkerListServer = async () => {
  const [res, resEvents] = await Promise.all([
    fetch(
      "https://api.smk.dk/api/v1/art/search/?keys=*&offset=80000&rows=2000"
    ),
    fetch("https://async-exhibit-server-rmug.onrender.com/events/"),
  ]);
  const [artData, events] = await Promise.all([res.json(), resEvents.json()]);

  const artworks = filterHasImage(artData.items);

  return <VaerkerListClient events={events} artData={artworks} />;
};

export default VaerkerListServer;


//DOKUMENTATION BRUGT 

//promiseAll
//https://medium.com/@sito6496t/how-to-fetch-multiple-apis-c59fec9076e2