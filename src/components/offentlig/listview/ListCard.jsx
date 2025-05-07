import Image from "next/image";
import Link from "next/link";
import Button from "@/components/global/Button";

const ListCard = () => {
  return (
    <Link href={`/arrangementer/${event.id}`}>
      <li className="mb-4 px-2 hover:scale-105 transition-all duration-300 md:min-h-100">
        <Image
          alt={`Billede af ${event.title}`}
          width={1000}
          height={1000}
          src="/placeholder.png"
          className=""
        />
        <div className="px-2 py-2 flex justify-between items-top">
          <div>
            <h3 className="font-bold">Event</h3>
            <p>Beskrivende tekst om arrangement kort beskrevet</p>
          </div>
          <Button>Læs mere</Button>
        </div>
      </li>
    </Link>
  );
};

export default ListCard;
