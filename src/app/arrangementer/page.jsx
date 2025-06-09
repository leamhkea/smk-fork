import dynamic from "next/dynamic";

const ListServer = dynamic(
  () => import("@/components/offentlig/listview/ListServer"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Arrangementer = () => {
  return (
    <section>
      <ListServer />
    </section>
  );
};

export default Arrangementer;
