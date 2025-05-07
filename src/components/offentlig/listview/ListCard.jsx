import Image from "next/image";
import Link from "next/link";
import Button from "@/components/global/Button";

const ListCard = () => {
  return (
    // <Link href={`/arrangementer/${event.id}`}>
    <li className="flex flex-col flex-wrap gap-5 p-5 text-center hover:scale-105 transition-all duration-300">
      <Image
        alt="Billede tilhørende event"
        width="500"
        height="500"
        src="/placeholder.png"
        className="object-contain max-w-full self-center"
      />

      <h3 className="font-bold">Event</h3>
      <p>Beskrivende tekst om arrangement kort beskrevet</p>

      <Button>Læs mere</Button>
    </li>

    // </Link>
  );
};

export default ListCard;
