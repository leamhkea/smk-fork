import Ramme from "../global/Ramme";
import TertrieryButton from "../global/buttons/TertrieryButton";
import Link from "next/link";
import Image from "next/image";

const Hero = ({ art, events }) => {
  const matchedArtworks = events.artworkIds?.length
    ? art?.filter((artwork) =>
        events.artworkIds.includes(artwork.object_number)
      )
    : [];

  return (
    <div className="relative w-full h-screen overflow-hidden -z-10">
      {/* Baggrundsbillede */}
      {matchedArtworks?.[0]?.image_thumbnail && (
        <Image
          alt="artwork"
          src={matchedArtworks[0].image_thumbnail}
          fill
          priority
          className="object-cover w-full h-full z-0"
        />
      )}
      {/* Indhold ovenpå billedet */}
      <article className="relative flex flex-col z-0 justify-between gap-8 h-full p-8 text-white bg-black/50">
        <Ramme className="mt-20 pb-50 border-(--blue) border-[10px]">
          <div className="flex flex-col gap-10 pt-30">
            <div>
              <h1 className="text-4xl font-bold">{events.title} |</h1>
              <h2 className="text-2xl">{events.date}</h2>
            </div>

            <p className="max-w-xl">{events.description}</p>
          </div>

          {/* <div className="self-start mt-auto">
            <Link href={`/arrangementer/${events.id}`}>
              <TertrieryButton>Læs mere om arrangementet</TertrieryButton>
            </Link>
          </div> */}
        </Ramme>
      </article>
    </div>
  );
};

export default Hero;
