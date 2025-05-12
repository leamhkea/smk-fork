"use client";
import useBookingStore from "@/store/bookingStore";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi2";

const BilletAntal = ({ id, antal }) => {
  // Laver const med functions fra bookingStore, så antal billetter opdateres med udgangspunkt i state
  const decAntal = useBookingStore((state) => state.decAntal);
  const incAntal = useBookingStore((state) => state.incAntal);

  return (
    <div>
      <div className="flex items-center space-x-2 w-25">
        {/* Tilføjer x antal billetter til kurven */}
        <button onClick={() => decAntal(id)}>
          <HiMinus />
        </button>

        {/* Viser antallet billetter tilføjet til kurven */}
        <input
          type="number"
          value={antal}
          onChange={(e) => setCount(Math.max(1, +e.target.value))}
          className="text-center w-12"
        />

        {/* Fjerner x antal billetter til kurven */}
        <button onClick={() => incAntal(id)}>
          <BsPlusLg />
        </button>
      </div>
      <hr />
    </div>
  );
};

export default BilletAntal;
