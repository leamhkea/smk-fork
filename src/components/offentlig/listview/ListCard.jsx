import Image from "next/image";
import Link from "next/link";
import Button from "@/components/global/Button";

const ListCard = () => {
  return (
    // <Link href={`/arrangementer/${event.id}`}>
    <li className="flex flex-col mb-4 px-2 hover:scale-105 transition-all duration-300 md:min-h-100 border-red-600">
      <Image
        alt="Billede tilhørende event"
        width={200}
        height={200}
        src="/placeholder.png"
        className=""
      />

      <div className="py-4">
        <h3 className="font-bold">Event</h3>
        <p>Beskrivende tekst om arrangement kort beskrevet</p>
      </div>
      <Button>Læs mere</Button>
    </li>
    // </Link>
  );
};

export default ListCard;
