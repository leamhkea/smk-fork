export const filterHasImage = (artworks) => artworks.filter(item => item.has_image &&
    item.object_names?.some(obj => obj.name === "Maleri")); //vis kun værker med img 
export const limitTo30 = (artworks) => artworks.slice(0, 30); //vis kun 30 værker ad gangen


// &&
//     item.object_names?.some(obj => obj.name === "Skulptur") // display evt. efter type kunst???
//måske enrichment_url, beskrivelse? et eller andet, der giver flere informationer? 