import SingleVaerkCard from "@/components/kurator/singleViewVaerker/SingleVaerkCard";

const VaerkerSingleView = async ({ params }) => {
  const { object_number } = params;
  const response = await fetch(`https://api.smk.dk/api/v1/art/?object_number=${object_number}`);
  
  const artData = await response.json();

  const art = artData?.items?.[0];

  return (
  <section>
      <SingleVaerkCard art={art} />
  </section>)

};

export default VaerkerSingleView;
