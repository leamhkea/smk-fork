export const filterHasImage = (artworks) => artworks.filter(item => item.has_image);
export const limitTo30 = (artworks) => artworks.slice(0, 30);
export const visFlere = (artworks, offset) => artworks.slice(offset, offset + 30);
