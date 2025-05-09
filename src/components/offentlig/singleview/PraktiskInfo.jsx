import Ramme from "@/components/global/Ramme";

const PraktiskInfo = ({ event }) => {
  return (
    <Ramme>
      <div className="grid gap-12">
        <div>
          <h2 className="pb-2">Lokation</h2>
          <p>{event.location.address}</p>
        </div>

        <div>
          <h2 className="pb-2">Pris</h2>
          <p>Gratis arrangement</p>
        </div>
      </div>
    </Ramme>
  );
};

export default PraktiskInfo;
