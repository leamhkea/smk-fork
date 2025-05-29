export const limitTo30 = (artworks) => artworks.slice(0, 30); //vis kun 30 værker ad gangen

export const filterHasImage = (artworks) =>
  artworks.filter((item) => item.has_image); //vis kun værker med img

// Brug SMK's søge-API
export const searchArtworks = async (query) => {
  const res = await fetch(
    `https://api.smk.dk/api/v1/art/search/?keys=${query}&rows=200`
  );
  const data = await res.json();
  return filterHasImage(data.items);
};

// Til get-request af API'et
export const getEvents = async () => {
  const res = await fetch("https://async-exhibit-server-rmug.onrender.com/events");
  const data = await res.json();
  return data;
};
