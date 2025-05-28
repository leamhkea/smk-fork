"use client";

import useBookingStore from "@/store/bookingStore";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi2";

const BilletAntal = ({ id, antal, maxBilletter }) => {
  // Laver const med functions fra bookingStore, så antal billetter opdateres med udgangspunkt i state
  const decAntal = useBookingStore((state) => state.decAntal);
  const incAntal = useBookingStore((state) => state.incAntal);

  // Laver en "wrapper" for incAntal der tjekker mod maxBilletter
  const handleIncrement = () => {
    if (antal < maxBilletter) {
      incAntal(id);
    } else {
      alert("Du kan ikke bestille flere billetter til dette arrangement.");
    }
  };

  return (
    <div className="flex items-center">
      {/* ===================== TILFØJER X ANTAL BILLETTER TIL KURVEN ====================== */}
      <button onClick={() => decAntal(id)}>
        <HiMinus />
      </button>

      {/* ===================== VISER X ANTAL BILLETTER I KURVEN ====================== */}
      <input
        type="number"
        value={antal}
        onChange={(e) => setCount(Math.max(1, +e.target.value))}
        className="text-center w-15"
      />

      {/* ===================== FJERNER X ANTAL BILLETTER FRA KURVEN ====================== */}
      <button onClick={handleIncrement}>
        <BsPlusLg />
      </button>
    </div>
  );
};

export default BilletAntal;
