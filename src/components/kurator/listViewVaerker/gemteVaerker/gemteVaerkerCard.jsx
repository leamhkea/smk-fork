"use client";
import Image from "next/image";
import DeleteTrash from "@/components/global/ikoner/DeleteTrash";
import useArtworkStore from "@/store/kuratorStore";

const GemteVaerkerCard = ({vaerk}) => {
  const sletVaerk = useArtworkStore((state) => state.sletVaerk);

    return ( <div className="flex flex-row gap-4 items-stretch mb-16">
      {vaerk.image_thumbnail && (
            <Image
             src={vaerk.image_thumbnail}
             alt={`Billede af ${vaerk.title}`}
             width={200}
             height={200}
             className="object-contain max-w-full self-center"
             />
             )}
      <div className="flex flex-col justify-between flex-1">
        <h2>{vaerk.titles[0]?.title}</h2>
        <div className="flex justify-between">
        <div className="flex">
            <p className="bold">Inventarnummer:</p>
            <span className="px-4">|</span>
            <p>{vaerk.object_number}</p>
          </div>
        </div>
        <button
            className=" hover:text-red-600"
            onClick={() => sletVaerk(vaerk.object_number)}
          >
            <DeleteTrash />
          </button>
      </div>
    </div> );
}
 
export default GemteVaerkerCard;