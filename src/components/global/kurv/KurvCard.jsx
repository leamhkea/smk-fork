import Image from "next/image";
import DeleteTrash from "../ikoner/DeleteTrash";
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
        <h2>{event.title}</h2>

        {/* Herunder er alt praktisk information + antal og slet knap */}
        <div className="flex flex-wrap justify-between gap-y-4">
          <div className="flex flex-wrap items-center gap-x-4">
            <p>{event.date}</p>
            <span className="hidden sm:inline px-2">|</span>
            <p>{event.location.address}</p>
          </div>

          <div className="flex gap-4">
            {/* Sender parameter med id og antal, så BilletAntal kan påvirke antal billetter arrangement */}
            <BilletAntal className="flex-1" id={event.id} antal={event.antal} />

            {/* Sender parameter med event.id, så id kan slette et helt event tilføjet til kurv */}
            <button
              className="flex-1 hover:text-red-600"
              onClick={() => sletBillet(event.id)}
            >
              <DeleteTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KurvCard;
