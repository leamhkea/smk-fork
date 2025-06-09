import dynamic from "next/dynamic";

const ListServer = dynamic(
  () => import("@/components/offentlig/listview/ListServer"),
  {
    ssr: false, // Hvis komponenten kun skal køre i browseren
    loading: () => <p>Loading...</p>,
    ssr: false,
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
