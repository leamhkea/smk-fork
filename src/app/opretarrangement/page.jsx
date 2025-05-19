import Inputs from "@/components/kurator/opretArrangementer/Inputs";

const OpretArrangement = async () => {
  const res = await fetch("http://localhost:8080/events");
  const events = await res.json();

  return (
    <section className="flex flex-col gap-10 px-[--content-width]">
      <Inputs events={events} />
    </section>
  );
};

export default OpretArrangement;
