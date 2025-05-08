import ListClient from "./ListClient";

const ListServer = async () => {
  const data = await fetch("http://localhost:8080/events");
  const events = await data.json();

  return (
    <div>
      <ListClient data={events} />
    </div>
  );
};

export default ListServer;
