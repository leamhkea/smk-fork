import ListClient from "./ListClient";

const ListServer = async () => {
  const event = await fetch("http://localhost:8080/events");
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
