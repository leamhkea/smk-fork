import ListClient from "./ListClient";

// ListServer er en asynkron komponent. async betyder, at man arbejder med asynkrone operationer (f.eks. at hente data fra en API).
const ListServer = async () => {
  // await: Da fetch er en asynkron funktion, bruges await til at vente på, at anmodningen bliver færdig, før man går videre.
  // fetch: Bruges til at sende en HTTP-anmodning til en API. Her sendes en GET-anmodning til API
  const [event, smkData] = await Promise.all([
    fetch("https://async-exhibit-server-rmug.onrender.com/events"),

    fetch(
      "https://api.smk.dk/api/v1/art/search/?keys=*&offset=0&rows=2000"
    ),
  ]);
  // Når fetch-anmodningen er færdig, fås et Response-objekt (data), som konverteres til et JSON-format.
  const [events, smk] = await Promise.all([event.json(), smkData.json()]);

  const allArtworkIds = events.flatMap((event) => event.artworkIds || []);
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

  // Herunder laves const til alle lokationer, som bliver filtreret
  const kobenhavn = events.filter((event) =>
    event.location?.address.includes("København")
  );
  const aarhus = events.filter((event) =>
    event.location?.address.includes("Aarhus")
  );
  const odense = events.filter((event) =>
    event.location?.address.includes("Odense")
  );
  const aalborg = events.filter((event) =>
    event.location?.address.includes("Aalborg")
  );
  const esbjerg = events.filter((event) =>
    event.location?.address.includes("Esbjerg")
  );
  const koge = events.filter((event) =>
    event.location?.address.includes("Køge")
  );
  const silkeborg = events.filter((event) =>
    event.location?.address.includes("Silkeborg")
  );
  const lyngby = events.filter((event) =>
    event.location?.address.includes("Lyngby")
  );
  const holstebro = events.filter((event) =>
    event.location?.address.includes("Holstebro")
  );

  return (
    <div>
      <ListClient
        // Herunder bliver const lokationerne sendt afsted som props
        events={events}
        kobenhavn={kobenhavn}
        aarhus={aarhus}
        odense={odense}
        aalborg={aalborg}
        esbjerg={esbjerg}
        koge={koge}
        silkeborg={silkeborg}
        lyngby={lyngby}
        holstebro={holstebro}
        art={completeArtworks}
      />
    </div>
  );
};

export default ListServer;

//DOKUMENTATION BRUGT

//til at fetche under én funktion
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all