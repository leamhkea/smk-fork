import Image from "next/image";
import Link from "next/link";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";

const VaerkerListCard = ({art}) => {
    return (
        <Link href={`/vaerkarkiv/${art.object_number}`}>
        <li className="flex flex-col flex-wrap gap-5 p-5 text-center hover:scale-105 transition-all duration-300">
        {art.image_thumbnail && (
        <Image
        src={art.image_thumbnail}
        alt={`Billede af ${art.title}`}
        width={500}
        height={500}
        className="object-contain max-w-full self-center"
        />
        )}
        <h2>{art.titles[0]?.title}</h2>
        <div className="flex justify-center gap-1">
        <p>{`${art.artist} |`}</p>
        <p>{art.object_names[0]?.name}</p>
        </div>
          <p>{art.acquisition_date_precision}</p>
          <div className="flex justify-center gap-1">
            <p>Inventarnummer |</p>
            <p className="thin">{art.object_number}</p>
          </div>
          <SecondaryButton>Læs mere</SecondaryButton>
        </li>
      </Link> 
      );
}
 
export default VaerkerListCard;