import Image from "next/image";

const SamledeImg = ({ event }) => {
  return (
    <div className="flex items-center gap-10 m-auto flex-wrap">
      <Image
        alt={`Billede af ${event.title}`}
        width={300}
        height={300}
        src="/placeholder.png"
        className="object-cover"
      />

      <Image
        alt={`Billede af ${event.title}`}
        width={500}
        height={500}
        src="/placeholder.png"
        className="object-cover"
      />

      <Image
        alt={`Billede af ${event.title}`}
        width={300}
        height={300}
        src="/placeholder.png"
        className="object-cover"
      />
    </div>
  );
};

export default SamledeImg;
