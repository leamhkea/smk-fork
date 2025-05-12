import Image from "next/image";
import DeleteTrash from "../ikoner/DeleteTrash";

const KurvCard = () => {
  return (
    <div className="p-10 overflow-y-auto grid gap-8">
      <p>Kurv</p>

      <div className="flex flex-row gap-4 items-stretch">
        <Image
          alt={`Billede af !event titel!`}
          width={100}
          height={100}
          src="/placeholder.png"
          className="object-cover"
        />
        <div className="flex flex-col justify-between flex-1">
          <h2>Event titel</h2>
          <div className="flex justify-between">
            <div className="flex">
              <p>2025/06/07</p>
              <span className="px-4">|</span>
              <p>13:30</p>
            </div>
            <div className="flex gap-8">
              <p>Hej</p>
              <DeleteTrash />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KurvCard;
