"use client";
import useBookingStore from "@/store/bookingStore";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Kurv = () => {
  const { billetter, billetSum } = useBookingStore((state) => state);

  return (
    <div className="relative">
      <HiOutlineShoppingBag size={30} />
      {billetter.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-(--blue) text-(--white) rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {billetSum()}
        </span>
      )}
    </div>
  );
};

export default Kurv;
