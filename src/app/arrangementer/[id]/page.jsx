import SingleCard from "@/components/offentlig/singleview/SingleCard";

export default async function SingleView({ params }) {
  const { id } = await params;

  const data = await fetch(`http://localhost:8080/events/${id}`);
  const eventData = await data.json();
  return (
    <div>
      <SingleCard event={eventData} />
    </div>
  );
}
