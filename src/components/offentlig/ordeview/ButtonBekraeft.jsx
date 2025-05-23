import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import Link from "next/link";

const ButtonBekraeft = () => {
  return (
    <Link href={`/ordrebekraeftelse`}>
      <TertrieryButton>Bekræft booking</TertrieryButton>
    </Link>
  );
};

export default ButtonBekraeft;
