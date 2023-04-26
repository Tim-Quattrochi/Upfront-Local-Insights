import { options } from "../utilities/options";

const FilterByCat = ({ businesses, setSelected }) => {
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
