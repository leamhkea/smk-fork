"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef } from "react";
import Image from "next/image";

export default function ScrollLinked({ event, art }) {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  const matchedArtworks = event.artworkIds?.length
    ? art?.filter((artwork) => event.artworkIds.includes(artwork.object_number))
    : [];

  return (
    <div className="flex justify-between gap-12 mx-auto">
      <div className="break-words pb-2 self-center">
        <h2>Kunstner historik</h2>
        <p>
          {Array.isArray(art?.production) && art.production[0]?.creator_history
            ? art.production[0].creator_history
            : "Kunstneren har ingen historik"}
        </p>
      </div>
      <div id="example" className="mx-auto">
        <motion.ul ref={ref} style={{ maskImage }}>
          {matchedArtworks.map((art) => (
            <li key={art.object_number} className="flex items-center">
              {art?.image_thumbnail && (
                <Image
                  alt="artwork"
                  src={art.image_thumbnail}
                  width={500}
                  height={500}
                  className="object-contain w-full h-auto"
                />
              )}
            </li>
          ))}
        </motion.ul>
        <StyleSheet />
      </div>
    </div>
  );
}

const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;

function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}

function StyleSheet() {
  return (
    <style>{`
      #example {
        max-width: 600px;
        position: relative;
      }

      #example ul {
        display: flex;
        list-style: none;
        overflow-x: scroll;
        padding: 20px 0;

        margin: 0 auto;
        gap: 40px;
      }

      #example li {
        flex: 0 0 400px;
      }
    `}</style>
  );
}
