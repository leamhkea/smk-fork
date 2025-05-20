import ListClient from "./ListClient";

// ListServer er en asynkron komponent. async betyder, at man arbejder med asynkrone operationer (f.eks. at hente data fra en API).
const ListServer = async () => {
  // await: Da fetch er en asynkron funktion, bruges await til at vente på, at anmodningen bliver færdig, før man går videre.
  // fetch: Bruges til at sende en HTTP-anmodning til en API. Her sendes en GET-anmodning til Petfinder API
  const event = await fetch("https://async-exhibit-server-rmug.onrender.com/events");

  // Når fetch-anmodningen er færdig, fås et Response-objekt (data), som konverteres til et JSON-format.
  const events = await event.json();

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
      />
    </div>
  );
};

export default ListServer;
