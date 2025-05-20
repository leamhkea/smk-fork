import SingleCard from "@/components/offentlig/singleview/SingleCard";

export default async function SingleView({ params }) {
  const { id } = await params;

  const [dataAsync, dataSMK] = await Promise.all([
    fetch(`https://async-exhibit-server-rmug.onrender.com/events/${id}`),

    fetch(
      "https://api.smk.dk/api/v1/art/search/?keys=*&offset=80000&rows=2000"
    ),
  ]) 

  const [eventData, smkData] = await Promise.all([dataAsync.json(), dataSMK.json()]);

  const allArtworkIds = eventData.artworkIds || [];
  const smkObjectNumbers = smkData.items.map((item) => item.object_number);
  const missing = allArtworkIds.filter((id) => !smkObjectNumbers.includes(id));

  // Funktion til at hente manglende værker, der ikke ligger i de første 2000 rows af smks api
  const fetchMissingArtworks = async (ids) => {
    const results = [];
    for (const id of ids) {
      const res = await fetch(`https://api.smk.dk/api/v1/art/search/?keys=${id}`);
      const data = await res.json();
      const match = data.items.find((item) => item.object_number === id);
      if (match) results.push(match);
    }
    return results;
  };

  const missingArtworks = await fetchMissingArtworks(missing);
  const completeArtworks = [...smkData.items, ...missingArtworks];

  return (
    <div>
      <SingleCard event={eventData} art={completeArtworks} />
    </div>
  );
}
