import Image from "next/image";
import DeleteTrash from "@/components/global/ikoner/DeleteTrash";

const GemteVaerkerCard = () => {
    return ( <div className="flex flex-row gap-4 items-stretch">
      <Image
        alt={`Billede af !event titel!`}
        width={100}
        height={100}
        src="/placeholder.png"
        className="object-cover"
      />
      <div className="flex flex-col justify-between flex-1">
        <h2>Værk titel</h2>
        <div className="flex justify-between">
        <div className="flex">
            <p className="bold">Inventarnummer:</p>
            <span className="px-4">|</span>
            <p>object_number</p>
          </div>
        </div>
        <DeleteTrash/>
      </div>
    </div> );
}
 
export default GemteVaerkerCard;