import Image from "next/image";
import DeleteTrash from "@/components/global/ikoner/DeleteTrash";
import BilletAntal from "./BilletAntal";
import useBookingStore from "@/store/bookingStore";

// Indhenter event, som blev sendt afsted fra popover som prop ( event={billet} )
const KurvCard = ({ event }) => {
  const sletBillet = useBookingStore((state) => state.sletBillet);

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
        {/* Herunder er alt praktisk information */}
        <h2>{event.title}</h2>
        <p>{event.location.address}</p>
        <p>{event.date}</p>

        <div className="flex gap-20 self-end">
          {/* Sender parameter med id og antal, så BilletAntal kan påvirke antal billetter arrangement */}
          <BilletAntal id={event.id} antal={event.antal} />

          {/* Sender parameter med event.id, så id kan slette et helt event tilføjet til kurv */}
          <button
            className=" hover:text-red-600"
            onClick={() => sletBillet(event.id)}
          >
            <DeleteTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KurvCard;
