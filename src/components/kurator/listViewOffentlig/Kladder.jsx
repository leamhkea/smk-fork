import Image from "next/image";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import useArtworkStore from "@/store/kuratorStore";

const Kladder = ({ event, vaerk }) => {
  const sletInputValue = useArtworkStore((state) => state.sletInputValue);

  return (
    <li className="flex flex-col justify-between gap-5 p-5 text-center hover:scale-105 transition-all duration-300 h-full min-h-[100px]">
    <div className="w-full h-80 flex items-center border-1 border-gray-300 justify-center overflow-hidden">
      {vaerk?.image_thumbnail && (
        <Image
          src={vaerk.image_thumbnail}
          alt={`Billede af ${vaerk.title}`}
          width={200}
          height={200}
          className="object-cover max-w-full"
        />
      )}
      </div>
      <div className="flex flex-col justify-between flex-1">
        <h2 className="text-lg font-bold">{event.titel}</h2>
        <p className="text-sm">{event.dato}</p>
        <SecondaryButton>Rediger</SecondaryButton>
        <TertrieryButton>Publicer</TertrieryButton>
        <button
            className=" hover:text-red-600"
            onClick={() => sletInputValue(event.id)}
          >
            Slet kladde
          </button>
      </div>
    </li>
  );
};

export default Kladder;
