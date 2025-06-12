export const limitTo30 = (artworks) => artworks.slice(0, 30); //vis kun 30 værker ad gangen

export const filterHasImage = (artworks) => artworks.filter((item) => item.has_image); //vis kun værker med img

// Brug SMK's søge-API
export const searchArtworks = async (query) => {
  const res = await fetch(
    `https://api.smk.dk/api/v1/art/search/?keys=${query}&rows=200`
  );
  const data = await res.json();
  return filterHasImage(data.items); //sørg for at der kun vises værker med billede ved søgning
};

// Til get-request af API'et
export const getEvents = async () => {
  const res = await fetch("https://async-exhibit-server-rmug.onrender.com/events");
  const data = await res.json();
  return data;
};

//LOAD MORE KNAP

export const setArtworks = (set, newArtworks) => { //arrays defineret i zustand
  set({
    artworks: newArtworks, //tilføj flere
    initialArtworks: newArtworks, //de første vist på siden
    filteredArtworks: newArtworks,//til filtrering
    visteVaerker: newArtworks, //til vis gemte værker
    visibleArtworks: newArtworks.slice(0, 30), //vis kun 30
    offset: 30, //vis de næste 30
  });
};

export const loadMoreArtworks = (get, set) => {
  const { filteredArtworks, artworks, visibleArtworks, offset, allFilters } = get();

  const isFiltered = Object.values(allFilters).some((value) => value !== ""); //Object() bruges fordi der skal itereres over objekter. Med denne metode konverteres de til et array ellers ville det ikke være muligt at bruge some().

  const initialFiltreret = isFiltered ? filteredArtworks : artworks;
  const next30 = initialFiltreret.slice(offset, offset + 30);

  if (next30.length > 0) {
    set({
      visibleArtworks: [...visibleArtworks, ...next30],
      offset: offset + 30, //load de næste 30 og ikke de samme igen
    });
  }
};


export const hasMore = (get, visKunValgte = false) => { //bruges til kun at vise knappen hvis der er flere at load
  if (visKunValgte) return false; //bruges til vis kun gemte værker

  const { filteredArtworks, artworks, visibleArtworks, allFilters } = get();

  const isFiltered = Object.values(allFilters).some((value) => value !== "");

  const initialFiltreret = isFiltered ? filteredArtworks : artworks;
  return visibleArtworks.length < initialFiltreret.length;
};

//DOKUMENTATION BRUGT

//Object
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
