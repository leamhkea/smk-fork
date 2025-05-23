"use server";
import useArtworkStore from "@/store/kuratorStore";
export async function PublicerServer(formData) {
    // den skal vide at formData er input fra savedEvents 

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    locationId: formData.get("locationId"),
    locationName: formData.get("locationName"),
    locationAddress: formData.get("locationAddress"),
    inventarnumre: formData.getAll("inventarnumre"),
  };

  // Post til Render API
  const res = await fetch("https://async-exhibit-server-rmug.onrender.com/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Fejl ved oprettelse af arrangement.");
  }

  return await res.json();
}
