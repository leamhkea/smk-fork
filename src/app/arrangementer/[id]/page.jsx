import dynamic from "next/dynamic";

const SingleCard = dynamic(
  () => import("@/components/offentlig/singleview/SingleCard"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default async function SingleView({ params }) {
  const { id, object_number } = await params;

  // Ved at bruge Promise.all() henter vi dem samtidig i stedet for én efter én
  const [dataAsync, dataSMK] = await Promise.all([
    fetch(`https://async-exhibit-server-rmug.onrender.com/events/${id}`),

    fetch(`https://api.smk.dk/api/v1/art/?object_number=${object_number}`),
  ]);

  // Parser begge fetch-responser til JSON. Nu har vi to JavaScript-objekter
  const [eventData, smkData] = await Promise.all([
    dataAsync.json(),
    dataSMK.json(),
  ]);

  // Henter en liste over artworkIds fra eventet – altså hvilke kunstværker det handler om
  const allArtworkIds = eventData.artworkIds || [];

  // Laver en liste over alle object_number fra de SMK-værker, vi har hentet
  const smkObjectNumbers = smkData.items.map((item) => item.object_number);

  // Finder ud af, hvilke kunstværker fra eventet ikke var med i de 2000 værker, vi hentede fra SMK
  const missing = allArtworkIds.filter((id) => !smkObjectNumbers.includes(id));

  // Funktion til at hente manglende værker, der ikke ligger i de første 2000 rows af smks api
  const fetchMissingArtworks = async (ids) => {
    const results = [];
    for (const id of ids) {
      const res = await fetch(
        `https://api.smk.dk/api/v1/art/search/?keys=${id}`
      );
      const data = await res.json();
      const match = data.items.find((item) => item.object_number === id);
      if (match) results.push(match);
    }
    return results;
  };

  // Kalder funktionen for at hente alle manglende kunstværker
  const missingArtworks = await fetchMissingArtworks(missing);

  // Samler alt sammen i én array: Både de 2000 værker fra SMK og dem vi lige har hentet ekstra
  const completeArtworks = [...smkData.items, ...missingArtworks];

  return (
    <section>
      <SingleCard event={eventData} art={completeArtworks} />
    </section>
  );
}
