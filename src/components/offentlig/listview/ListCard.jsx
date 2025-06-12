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
          <div
            className="w-full relative overflow-hidden border border-gray-300"
            style={{ paddingTop: "100%" }}
          >
            {matchedArtworks?.[0]?.image_thumbnail && (
              <Image
                src={matchedArtworks[0].image_thumbnail}
                alt="artwork"
                layout="fill"
                objectFit="contain"
                className="absolute top-0 left-0"
                priority={false}
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
