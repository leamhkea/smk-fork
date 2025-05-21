import Image from "next/image";
import Link from "next/link";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import GemEtVaerkIcon from "./gemteVaerker/GemEtVaerkIcon";

const VaerkerListCard = ({art}) => {

    return (
        <li className="flex flex-col flex-wrap gap-5 p-5 text-center hover:scale-105 transition-all duration-300">

        <GemEtVaerkIcon vaerk={art} />
        {art.image_thumbnail && (
        <Image
        src={art.image_thumbnail}
        alt={`Billede af ${art.title}`}
        width={500}
        height={500}
        className="object-contain max-w-full self-center"
        />
        )}

        <Link href={`/vaerkarkiv/${art.object_number}`}>
        <h2>{art.titles?.[0]?.title || "ukendt titel"}</h2>

        <div className="flex justify-center gap-1">
          <p>{art.artist}</p> 
            <span>|</span>
          <p>{art.object_names?.[0]?.name || "Ukendt kategori"}</p>
        </div>
        
          <p>{art.acquisition_date_precision}</p>

          <SecondaryButton>Læs mere</SecondaryButton>

          </Link>
        </li> 
      );
}
 
export default VaerkerListCard;