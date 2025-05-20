import Image from "next/image";
import Link from "next/link";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";

const ListCard = ({ event, art }) => {

  //matcher artworksID fra async api med object_number i smks api
  const matchedArtworks = event.artworkIds?.length
  ? art?.filter((artwork) =>
      event.artworkIds.includes(artwork.object_number)
    )
  : [];

  
  return (
    <Link href={`/arrangementer/${event.id}`}>
      {/* Sætter en min-heigt på li container, så der sikres en ensartet højde på alle cards uanset indholdet */}
      <li className="flex flex-col justify-between gap-5 p-5 text-center hover:scale-105 transition-all duration-300 h-full min-h-[100px]">
        {matchedArtworks?.[0]?.image_thumbnail && ( //viser kun det første billede ud fra forskellige object_numbers
          <Image
            alt="artwork"
            width={400}
            height={400}
            src={matchedArtworks[0].image_thumbnail}
          />
        )}
        <h3>{event.title}</h3>
        <p>{event.date}</p>
        <SecondaryButton>Læs mere</SecondaryButton>
      </li>
    </Link>
  );
};

export default ListCard;
