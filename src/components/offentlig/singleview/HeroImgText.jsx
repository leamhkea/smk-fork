import Image from "next/image";

const HeroImgText = ({ event }) => {
  return (
    <div className="grid relative">
      {/* Div placerer text og image i forhold til hinanden */}
      <div className="col-start-1 row-start-1 m-auto relative">
        <Image
          alt={`Billede af ${event.title}`}
          width={500}
          height={500}
          src="/placeholder.png"
          className="object-cover"
        />

        {/* Div placerer text halvt ud fra venstre side på image */}
        <div className="absolute top-1/4 left-0 sm:left-[-15%] transform -translate-y-1/2 px-4 sm:px-0">
          <h1>{event.title}</h1>
          <h2>{event.location.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default HeroImgText;
