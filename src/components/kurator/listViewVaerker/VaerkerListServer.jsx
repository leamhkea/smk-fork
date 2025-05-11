import VaerkerListClient from "./VaerkerListClient";

const VaerkerListServer = async () => {
  const data = await fetch("https://api.smk.dk/api/v1/art/search/?keys=*&offset=0&rows=30");
  const artData = await data.json();
  const artworks = artData.items;

  return <VaerkerListClient artData={artworks} />;
};

export default VaerkerListServer;
