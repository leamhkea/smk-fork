import Image from "next/image";
import Link from "next/link";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";

const ListCard = ({ event }) => {
  return (
    <Link href={`/arrangementer/${event.id}`}>
      <li className="flex flex-col flex-wrap gap-5 p-5 text-center hover:scale-105 transition-all duration-300">
        <Image
          alt={`Billede af ${event.title}`}
          width={500}
          height={500}
          src={event.artworkIds}
        />

        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>{event.date}</p>

        <SecondaryButton>Læs mere</SecondaryButton>
      </li>
    </Link>
  );
};

export default ListCard;
