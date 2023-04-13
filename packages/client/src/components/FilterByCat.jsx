import React from "react";

const FilterByCat = ({ businesses, setSelected }) => {
  const options = [
    { value: "", text: "--Select By Category--" },
    { value: "Restaurant", text: "Restaurant" },
    { value: "Bar", text: "Bar" },
    { value: "Cafe", text: "Cafe" },
    { value: "Retail", text: "Retail" },
    { value: "Salon", text: "Salon" },
    { value: "Animal", text: "Animal" },
    { value: "Auto", text: "Auto" },
    { value: "Hardware", text: "Hardware" },
    { value: "Gas Station", text: "Gas Station" },
    { value: "Other", text: "Other" },
  ];

  const handleSelected = (e) => {
    setSelected(e.target.value);
  };

  return (
    <select
      className=" sm:select-sm select select-success  w-full max-w-xs"
      onChange={handleSelected}
    >
      {options.map((cat, i) => (
        <option key={cat.value} value={cat.value}>
          {cat.text}
        </option>
      ))}
    </select>
  );
};

export default FilterByCat;
