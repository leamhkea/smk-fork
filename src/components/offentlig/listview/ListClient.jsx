"use client";
import { useState } from "react";
import ListCard from "./ListCard";

const ListClient = () => {
  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ListCard />
    </ul>
  );
};

export default ListClient;
