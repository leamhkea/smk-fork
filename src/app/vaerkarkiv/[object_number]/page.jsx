import dynamic from "next/dynamic";

const SingleCard = dynamic(
  () => import("@/components/offentlig/singleview/SingleCard"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const VaerkerSingleView = async ({ params }) => {
  const { object_number } = params;
  const response = await fetch(
    `https://api.smk.dk/api/v1/art/?object_number=${object_number}`
  );

  const artData = await response.json();

  const art = artData?.items?.[0];

  return (
    <section>
      <SingleCard art={art} />
    </section>
  );
};

export default VaerkerSingleView;
