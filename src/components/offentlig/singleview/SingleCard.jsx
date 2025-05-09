import Image from "next/image";

const SingleCard = ({ event }) => {
  return (
    <article>
      <Image
        alt={`Billede af ${event.title}`}
        width={500}
        height={500}
        src="/placeholder.png"
        className="object-contain max-w-full self-center"
      />
      <div>
        <h1>{event.title}</h1>
        <h2>{event.location.name}</h2>
      </div>

      <div>
        <h1>Event</h1>
        <h2>Galleri</h2>
      </div>
    </article>
  );
};

export default SingleCard;
