import TertrieryButton from "@/components/global/buttons/TertrieryButton";
import Ramme from "@/components/global/Ramme";

export default function Home() {
  return (
    <Ramme>
      <div className="flex flex-col gap-8 h-70">
        <div>
          <h1 className="blue">event titel |</h1>
          <h1 className="blue thin">dato</h1>
        </div>
        <p className="blue">event beskrivelse</p>
      </div>
      <TertrieryButton>Læs mere om arrangementet</TertrieryButton>
    </Ramme>
  );
}
