import Image from "next/image";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import useArtworkStore from "@/store/kuratorStore";
import { PublicerServer } from "../opretArrangementer/PublicerServer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Kladder = ({ event, vaerk }) => {
  const sletInputValue = useArtworkStore((state) => state.sletInputValue);
  const router = useRouter();

  const publicerEvent = async () => {
    try {
      await PublicerServer(event); // kun det ene event, ikke alle
      // sletInputValue(event.id); // evt. fjern kladden ved success
      router.push("/arrangementer");
    } catch (err) {
      console.error("Fejl:", err);
    }
  };
  
  

  return (
    <li className="flex flex-col justify-between gap-5 p-5 text-center h-full min-h-[100px]">

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
            <h2>{event.title}</h2>
            <p>{event.date}</p>

            <Link href={`/arrangementer/${event.id}`}>
            <SecondaryButton>Rediger</SecondaryButton>
          </Link>

        <TertrieryButton onClick={publicerEvent}>Publicer</TertrieryButton>
        <button
            className=" hover:text-red-600 mt-5"
            onClick={() => sletInputValue(event.id)}
          >
            Slet kladde
          </button>
      </div>
      
    </li>
  );
};

export default Kladder;
