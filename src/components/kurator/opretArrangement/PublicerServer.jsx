import { toast } from 'react-toastify';

export async function PublicerServer(event) {
  const data = {
    id: event.id || "Udefineret",
    title: event.title || "Udefineret",
    description: event.description || "Udefineret",
    date: event.date || "Udefineret",
    curator: event.curator || "Udefineret",
    locationId: event.location?.id || event.locationId || "Udefineret",
    artworkIds: event.artworkIds || [],

    // Location-detaljer hvis tilgængelige
    name: event.location?.name || "Udefineret",
    address: event.location?.address || "Udefineret",
    maxGuests: event.location?.maxGuests || "Udefineret",
    maxArtworks: event.location?.maxArtworks || "Udefineret",

    // Billet-information
    totalTickets: event.totalTickets || "Udefineret",
    bookedTickets: event.bookedTickets || "Udefineret",
  };

  const res = await fetch(
    "https://async-exhibit-server-rmug.onrender.com/events",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    toast.error("🚨 Fejl fra server: " + errorText);
    throw new Error("Fejl ved oprettelse af arrangement.");
  } else {
    toast.success("Event publiceret!");
  }
  

  return await res.json();
}
