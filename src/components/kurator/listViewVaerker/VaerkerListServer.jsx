import VaerkerListClient from "./VaerkerListClient";
import { filterHasImage, limitTo30 } from "@/librery/artworkUtils"; // importeret utils eftersom zustand ikke kan renderes i serverkomponent

const VaerkerListServer = async () => {
  const res = await fetch("https://api.smk.dk/api/v1/art/search/?keys=*&offset=120&rows=2000");
  const artData = await res.json();

  let artworks = filterHasImage(artData.items);
  artworks = limitTo30(artworks);

  return <VaerkerListClient artData={artworks} />;
};

export default VaerkerListServer;
