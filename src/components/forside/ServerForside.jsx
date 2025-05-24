import Hero from "./Hero";

const ServerForside = async () => {

  const [event, smkData] = await Promise.all([
    fetch("https://async-exhibit-server-rmug.onrender.com/events/02979c36-6618-42e1-be9d-cf6faa0f05db"),

    fetch(
      "https://api.smk.dk/api/v1/art/search/?keys=*&offset=80000&rows=2000"
    ),
  ]);

  const [events, smk] = await Promise.all([event.json(), smkData.json()]);

  const allArtworkIds = Array.isArray(events)
  ? events.flatMap((event) => event.artworkIds || [])
  : events.artworkIds || [];

  const smkObjectNumbers = smk.items.map((item) => item.object_number);
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
  const completeArtworks = [...smk.items, ...missingArtworks];

    
    return ( 
        <Hero art={completeArtworks} events={events}/>
     );
}
 
export default ServerForside;