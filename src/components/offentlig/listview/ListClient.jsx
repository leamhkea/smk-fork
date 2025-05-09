"use client";
import { useState } from "react";
import ListCard from "./ListCard";

const ListClient = ({ data }) => {
  return (
    <div>
      <div className="flex flex-col gap-4 mt-0 mb-8">
        <h1>Alle arrangementer</h1>
        <p>
          For neden vises alle kommende arrangementer på SMK - Statens Museum
          for Kunst.
        </p>
      </div>

      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {data.map((event) => (
          <ListCard key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
};

export default ListClient;
