import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/global/buttons/PrimaryButton";
import ScrollFlow from "@/components/global/ScrollFlow";

const ListCard = ({ event, art }) => {
  //matcher artworksID fra async api med object_number i smks api
  const matchedArtworks = event.artworkIds?.length
    ? art?.filter((artwork) => event.artworkIds.includes(artwork.object_number))
    : [];

  return (
    <li>
      <ScrollFlow>
        <Link
          href={`/arrangementer/${event.id}`}
          className="flex flex-col justify-between gap-5 p-5 text-center hover:scale-105 transition-all duration-300 h-full min-h-[100px]"
        >
          {/* Sætter en min-heigt på li container, så der sikres en ensartet højde på alle cards uanset indholdet */}
          <div className="w-full h-80 flex items-center border-1 border-gray-300 justify-center overflow-hidden">
            {matchedArtworks?.[0]?.image_thumbnail && (
              <Image
                src={matchedArtworks[0].image_thumbnail}
                alt="artwork"
                width={200}
                height={200}
                layout="responsive"
                className="object-contain"
              />
            )}
          </div>

          <h3>{event.title}</h3>
          <p>{event.date}</p>
          <PrimaryButton>Læs mere</PrimaryButton>
        </Link>
      </ScrollFlow>
    </li>
  );
};

export default ListCard;
