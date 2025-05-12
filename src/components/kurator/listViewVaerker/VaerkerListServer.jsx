import VaerkerListClient from "./VaerkerListClient";
import { filterHasImage } from "@/librery/artworkUtils";

const VaerkerListServer = async () => {
  const res = await fetch("https://api.smk.dk/api/v1/art/search/?keys=*&offset=80000&rows=2000");
  const artData = await res.json();

  const artworks = filterHasImage(artData.items);
  return <VaerkerListClient artData={artworks} />;
};

export default VaerkerListServer;
