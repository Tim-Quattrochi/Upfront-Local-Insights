import { options } from "../utilities/options";

const FilterByCat = ({ businesses, setSelected }) => {
  const handleSelected = (e) => {
    setSelected(e.target.value);
  };

  return (
    <select
      className=" select-sm select select-success "
      onChange={handleSelected}
    >
      {options.map((cat, i) => (
        <option key={i} value={cat.value}>
          {cat.text}
        </option>
      ))}
    </select>
  );
};

export default FilterByCat;
