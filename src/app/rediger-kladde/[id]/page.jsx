"use client";
import { useParams } from 'next/navigation';
import useArtworkStore from "@/store/kuratorStore";
import Inputs from '@/components/kurator/opretArrangementer/Inputs';

export default function RedigerKladde() {
  const { id } = useParams();
  const { savedEvents, gemteVaerker } = useArtworkStore();
  const kladde = savedEvents.find(params => params.id === id);

  return (
    <section className="flex gap-5">

      <div>

      <div className='flex gap-5'>
        <h3>Titel:</h3>
        <h3 className='thin'>{kladde.title}</h3>
      </div>
      <div className='flex gap-5'>
        <h3>Beskrivelse:</h3>
        <h3 className='thin'>{kladde.description}</h3>
      </div>
      <div className='flex gap-5'>
        <h3>Lokation:</h3>
        <div className='flex gap-2'>
          <h3 className='thin'>{kladde.location.name}</h3>
          <span>-</span>
          <h3 className='thin'>{kladde.location.address}</h3>
        </div>
      </div>
      <div className='flex gap-5'>
        <h3>Dato:</h3>
        <h3 className='thin'>{kladde.date}</h3>
      </div>
      </div>
    </section>
  );
}
