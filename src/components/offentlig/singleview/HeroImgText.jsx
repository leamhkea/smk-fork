import Image from "next/image";
import * as motion from "motion/react-client";
import SlideRight from "@/components/global/SlideRight";

const HeroImgText = ({ event, art }) => {
  //matcher artworksID fra async api med object_number i smks api
  const matchedArtworks = event.artworkIds?.length
    ? art?.filter((artwork) => event.artworkIds.includes(artwork.object_number))
    : [];

  return (
    <motion.div
      className="grid relative"
      initial={{ opacity: 0.1, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.2 },
      }}
    >
      {/* Div placerer text og image i forhold til hinanden */}
      <div className="col-start-1 row-start-1 m-auto relative ">
        {matchedArtworks?.[0]?.image_thumbnail && (
          <Image
            alt="artwork"
            src={matchedArtworks[0].image_thumbnail}
            width={500}
            height={500}
            className="object-contain w-full h-auto"
          />
        )}
        <SlideRight>
          {/* Div placerer text halvt ud fra venstre side på image */}
          <div className="absolute bottom-1/4 md:left-0 left-[18%] transform -translate-y-1/2 bg-(--white) p-5 border-2 border-(--blue)">
            <h1 className="text-(--blue)">{event.title}</h1>
            {/* <div className="flex flex-row pt-2"> */}
            <h3 className="text-(--blue) py-2">{event.location.name}</h3>
            {/* <span className="px-4">|</span> */}
            <p className="text-(--blue) thin">{event.date}</p>
            {/* </div> */}
          </div>
        </SlideRight>
      </div>
    </motion.div>
  );
};

export default HeroImgText;

//DOKUMENTATION BRUGT

// https://examples.motion.dev/react/enter-animation?utm_source=embed
