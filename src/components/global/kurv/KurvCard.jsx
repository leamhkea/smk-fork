import Image from "next/image";
import DeleteTrash from "../ikoner/DeleteTrash";
import BilletAntal from "./BilletAntal";

const KurvCard = ({ event }) => {
  return (
    <div className="flex flex-row gap-4 items-stretch mb-16">
      <Image
        alt={`Billede af !event titel!`}
        width={100}
        height={100}
        src="/placeholder.png"
        className="object-cover"
      />
      <div className="flex flex-col justify-between flex-1">
        <h2>{event.title}</h2>
        <div className="flex justify-between">
          <div className="flex">
            <p>{event.date}</p>
            <span className="px-4">|</span>
            <p>{event.location.address}</p>
          </div>
          <div className="flex gap-8">
            <BilletAntal className="flex-1" />
            <DeleteTrash className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KurvCard;
