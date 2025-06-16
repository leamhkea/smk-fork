import ListClient from "./ListClient";

// async: Man arbejder med asynkrone operationer (f.eks. at hente data fra en API).
// await: Da fetch er en asynkron funktion, bruges await til at vente på, at anmodningen bliver færdig, før man går videre.
// fetch: Bruges til at sende en HTTP-anmodning til en API. Her sendes en GET-anmodning til API.

const ListServer = async () => {
  const [event, smkData] = await Promise.all([
    // Promise all kører begge fetch kald samtidigt for hurtigere indlæsning.
    fetch("https://async-exhibit-server-rmug.onrender.com/events"),
    fetch(
      "https://api.smk.dk/api/v1/art/search/?keys=*&offset=80000&rows=2000"
    ),
  ]);
  // Når fetch-anmodningen er færdig, fås et Response-objekt (data), som konverteres til et JSON-format.
  const [events, smk] = await Promise.all([event.json(), smkData.json()]);

  // 1. flapmap: Samler alle artworkIds fra events i én lang liste. || []: Hvis et event ikke har artworkIds, bruges en tom liste
  // 2. map(...): Trækker alle object_number ud fra SMK-data
  // 3. filter(...): Finder kunstværk-id’er, som ikke findes i SMK-dataen
  const allArtworkIds = events.flatMap((event) => event.artworkIds || []);
  const smkObjectNumbers = smk.items.map((item) => item.object_number);
  const missing = allArtworkIds.filter((id) => !smkObjectNumbers.includes(id));

  // Funktion til at hente manglende værker, der ikke ligger i de første 2000 rows af smks api. Funktionen kører én fetch per manglende ID
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

  // Lægger de oprindelige 2000 SMK-værker og de hentede manglende værker sammen i én liste
  const missingArtworks = await fetchMissingArtworks(missing);
  const completeArtworks = [...smk.items, ...missingArtworks];

  // Herunder laves const til alle lokationer, som bliver filtreret
  const filterByer = (byer) =>
    events.filter((ev) => ev.location?.address.includes(byer)); // Brug af ?. (optional chaining) gør, at den ikke fejler, hvis location mangler

  return (
    <div>
      <ListClient
        // Herunder bliver const lokationerne sendt afsted som props
        events={events}
        art={completeArtworks}
        kobenhavn={filterByer("København")}
        aarhus={filterByer("Aarhus")}
        odense={filterByer("Odense")}
        aalborg={filterByer("Aalborg")}
        esbjerg={filterByer("Esbjerg")}
        koge={filterByer("Køge")}
        silkeborg={filterByer("Silkeborg")}
        lyngby={filterByer("Lyngby")}
        holstebro={filterByer("Holstebro")}
      />
    </div>
  );
};

export default ListServer;

//DOKUMENTATION BRUGT

//til at fetche under én funktion
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
