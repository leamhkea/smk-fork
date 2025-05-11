import SingleVaerkBeskrivelse from "./SingleVarkBeskrivelse";
import Image from "next/image";
const SingleVaerkCard = ({ art }) => {  
    return (
        <div className="flex flex-col gap-10">
            <div className="flex items-center flex-col md:flex-row gap-5">
                <div className="flex flex-col gap-5">
                    <div>
                    <h1>{art.titles?.[0]?.title}</h1>
                    <p>Forneden ses alt samlet data om kunstværket.</p>
                    </div>
                    <div>
                    <p>Skal du oprette et arrangement med udgagspunkt i et af SMKs værker, skal du indtaste værkets inventarnummer.</p>
                        <div className="flex gap-1">
                        <p className="bold">Inventarnummer |</p>
                        <p>{art.object_number}</p>
                        </div>
                    <a className="thin" href="/opretarrangement">Opret arrangement</a>
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

        <SingleVaerkBeskrivelse art={art}/>
        <ul>
        {art.alternative_images?.map((image, index) => (
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
        ))}
      </ul>
    </div>
    );
  };
  
  export default SingleVaerkCard;
  