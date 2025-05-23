export async function PublicerServer(event) {

  const data = { //alle dele af async api'et skal opdateres fra input. Tjek også input-komponentet og zustandstore
    id: event.id || "Udefineret",
    title: event.title || "Udefineret",
    description: event.description || "Udefineret",
    locationID: event.locationID || "Udefineret",
    curator: event.curator || "Udefineret",
    date: event.date || "Udefineret",
    locationId: event.location?.id || "Udefineret",
    curator: event.curator || "Udefineret",
    artworkIds: event.artworks?.map((v) => v.object_number) || [],
    totalTickets: event.totalTickets || "Udefineret",
    bookedTickets: event.bookedTickets || "Udefineret",
    name: event.location.name || "Udefineret",
    address: event.location.address || "Udefineret",
    maxGuests: event.location.maxGuests || "Udefineret",
    maxArtworks: event.location.maxArtworks || "Udefineret",
  };

  const res = await fetch("https://async-exhibit-server-rmug.onrender.com/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
        const errorText = await res.text(); // 👈 vis hele serverens svar
        console.error("🚨 Fejl fra server:", errorText);
        throw new Error("Fejl ved oprettelse af arrangement.");
  }

  return result = await res.json();
}
