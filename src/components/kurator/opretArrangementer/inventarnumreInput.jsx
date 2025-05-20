"use client";
import { useState } from "react";

const InventarnummerInput = ({ inventarnummer, inputValue, setInputValue, setFilter }) => {
  const [search, setSearch] = useState("");

  // filtrer inventarnumre lokalt
  const filteredInventar = inventarnummer.filter((nummer) =>
    nummer.title?.toLowerCase().includes(search.toLowerCase())
  );

  //gør det muligt at checke flere boxe
  const checkbox = (value, checked) => {
    const tomt = inputValue.inventarnummer || [];

    const fyldt = checked
      ? [...tomt, value]
      : tomt.filter((params) => params !== value);

    setFilter({ inventarnummer: fyldt });
    setInputValue("inventarnummer", fyldt);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="inventar-search">Kunstværk:</label>

      {/* searchbar, der gør det muligt at søge blandt id'er */}
      <input
        id="inventar-search"
        type="text"
        placeholder="Søg efter værk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-1 p-2"
      />

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-100 overflow-y-scroll border-1 p-4">
        {filteredInventar.map((inventar, i) => {
          const isChecked = inputValue.inventarnummer?.includes(inventar.id);
          return (
            <label key={i} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={inventar.id}
                checked={isChecked}
                onChange={(e) =>
                    checkbox(inventar.id, e.target.checked)
                }
              />
              {inventar.title}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default InventarnummerInput;
