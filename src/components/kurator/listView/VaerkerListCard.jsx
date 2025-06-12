import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/global/buttons/PrimaryButton";
import GemVaerk from "../opretArrangement/GemVaerk";
import useArtworkStore from "@/store/kuratorStore";

const VaerkerListCard = ({ art, events }) => {
  const selectedDate = useArtworkStore((state) => state.selectedDate);

  //Er værket allerede udstillet samme dato?
  const isInSameDate = events.some((event) => {
    const usedInEvent = event.artworkIds?.includes(art.object_number);
    const sameDate =
      selectedDate &&
      new Date(event.date).toDateString() ===
        new Date(selectedDate).toDateString();
    return usedInEvent && sameDate;
  });

  return (
    <li className="flex flex-col justify-between gap-5 p-5 text-center hover:scale-105 transition-all duration-300 h-full min-h-[100px]">
      <GemVaerk events={events} vaerk={art} />
      <div className="w-full h-80 relative border -z-10 border-gray-300 overflow-hidden flex items-center justify-center ">
        {art.image_thumbnail && (
          <Image
            src={art.image_thumbnail}
            alt={`Billede af ${art.title}`}
            width={500}
            height={500}
            className={`object-contain max-w-full self-center transition-opacity duration-300 ${
              isInSameDate ? "opacity-50" : "opacity-100"
            }`}
            loading="lazy"
          />
        )}

        {isInSameDate && (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            Dette værk er allerede udstillet d.{" "}
            {selectedDate && (
              <>
                &nbsp;
                {new Date(selectedDate).toLocaleDateString("sv-SE")}
              </>
            )}
          </div>
        )}
      </div>

      <Link href={`/vaerkarkiv/${art.object_number}`}>
        <div className="flex flex-col gap-5">
          {/* Herunder begrænsning på hvor lang titel må være */}
          <h3>
            {(art.titles?.[0]?.title || "ukendt titel").length > 16
              ? (art.titles?.[0]?.title || "ukendt titel").slice(0, 16) + "..."
              : art.titles?.[0]?.title || "ukendt titel"}
          </h3>

          <div className="flex justify-center gap-1">
            <p className="text-sm">{art.artist}</p>
            <span>|</span>
            <p className="text-sm">
              {art.object_names?.[0]?.name || "Ukendt kategori"}
            </p>
          </div>

          <p className="thin">{art.production_date?.[0]?.period}</p>

          <PrimaryButton>Læs mere</PrimaryButton>
        </div>
      </Link>
    </li>
  );
};

export default VaerkerListCard;
