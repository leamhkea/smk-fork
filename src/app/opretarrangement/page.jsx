import Inputs from "@/components/kurator/opretArrangementer/Inputs";

const OpretArrangement = async () => {
  const res = await fetch("https://async-exhibit-server-rmug.onrender.com/events");
  const events = await res.json();

  return (
    <section className="flex flex-col gap-10 px-[--content-width]">
      <Inputs events={events} />
    </section>
  );
};

export default OpretArrangement;
