import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import Link from "next/link";
import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import Image from "next/image";
const Kladder = () => {
    return (<div>
      <div className="flex justify-end items-center"> 
      <h1>Mine kladder</h1>
      <SecondaryButton>Opret nyt event</SecondaryButton>
      </div>
    <Link href="/">
      <li className="flex flex-col flex-wrap gap-5 p-5 text-center hover:scale-105 transition-all duration-300">
        <Image
          alt={`Billede af`}
          width={500}
          height={500}
          src="/placeholder.png"
          className="object-contain max-w-full self-center"
        />

        <h2>event titel</h2>
        <p>event beskrivelse</p>
        <p>event dato</p>

        <SecondaryButton>Rediger</SecondaryButton>
        <TertrieryButton>Publicer</TertrieryButton>
      </li>
    </Link>
    <hr/>
    </div>  );
}
 
export default Kladder;