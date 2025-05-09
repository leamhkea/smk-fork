import Image from "next/image";

const SingleCard = ({ event }) => {
  return (
    <article>
      <div>
        <Image
          alt={`Billede af ${event.title}`}
          width={500}
          height={500}
          src="/placeholder.png"
          className="object-contain max-w-full m-auto"
        />
        <div className="flex flex-col gap-2">
          <h1>{event.title}</h1>
          <h2>{event.location.name}</h2>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <h1>{event.title}</h1>
        <h2>{event.description}</h2>
      </div>
    </article>
  );
};

export default SingleCard;
