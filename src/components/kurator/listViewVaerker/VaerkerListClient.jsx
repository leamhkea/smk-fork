"use client";
import VaerkerListCard from "./VaerkerListCard";

const VaerkerListClient = ({ artData }) => {
  return (
    <div className="flex flex-col gap-4 mt-0 mb-8">
      <div>
        <h1>Alle kunstværker</h1>
        <p>For neden ses alle kunstværker i Statens Museum for Kunsts arkiv.</p>
      </div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {artData.map((art) => (
          <VaerkerListCard key={art.id} art={art} />
        ))}
      </ul>
    </div>
  );
};

export default VaerkerListClient;
