"use client";
import GoBackArrow from "@/components/global/buttons/GoBackArrow";
import Image from "next/image";

import SingleBeskrivelse from "./SingleBeskrivelse";

const SingleCard = ({ art }) => {
  return (
    <div>
      <GoBackArrow />
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-5">
            <div>
              <h1>{art.titles?.[0]?.title}</h1>
              <p>Forneden ses alt samlet data om kunstværket.</p>
            </div>
          </div>

          {art.image_thumbnail && (
            <Image
              src={art.image_thumbnail}
              alt={`Billede af ${art.title || "kunstværk"}`}
              width={500}
              height={500}
              className="object-contain max-w-full self-center"
            />
          )}
        </div>

        <SingleBeskrivelse art={art} />
        <ul>
          {art.alternative_images?.map(
            (image, index) =>
              image.thumbnail && (
                <li key={index}>
                  <Image
                    src={image.thumbnail}
                    alt={`Billede af ${art.title}`}
                    width={500}
                    height={500}
                    className="object-contain max-w-full self-center"
                  />
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default SingleCard;
