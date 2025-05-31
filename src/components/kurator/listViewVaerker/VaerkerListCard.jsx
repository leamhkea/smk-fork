import Image from "next/image";
import Link from "next/link";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import GemEtVaerkIcon from "../opretArrangementer/GemEtVaerkIcon";

const VaerkerListCard = ({ art, events }) => {
  return (
    <li className="flex flex-col justify-between gap-5 p-5 text-center hover:scale-105 transition-all duration-300 h-full min-h-[100px]">
      <GemEtVaerkIcon events={events} vaerk={art} />
      <div className="w-full h-80 flex items-center border-1 border-gray-300 justify-center overflow-hidden">
      {art.image_thumbnail && (
        <Image
          src={art.image_thumbnail}
          alt={`Billede af ${art.title}`}
          width={500}
          height={500}
          className="object-contain max-w-full self-center"
        />
      )}
      </div>

      <Link href={`/vaerkarkiv/${art.object_number}`}>
      <div className="flex flex-col gap-5">
      <h3>
          {(art.titles?.[0]?.title || "ukendt titel").length > 16
            ? (art.titles?.[0]?.title || "ukendt titel").slice(0, 16) + "..."
            : (art.titles?.[0]?.title || "ukendt titel")}
        </h3>
        <div className="flex justify-center gap-1">
          <p className="text-sm">{art.artist}</p>
          <span>|</span>
          <p className="text-sm">{art.object_names?.[0]?.name || "Ukendt kategori"}</p>
        </div>

        <p className="thin">{art.acquisition_date_precision}</p>

        <SecondaryButton>Læs mere</SecondaryButton>
        </div>
      </Link>
    </li>
  );
};

export default VaerkerListCard;
