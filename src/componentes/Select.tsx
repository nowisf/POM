import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "opcion1", label: "Opción 1" },
  { value: "opcion2", label: "Opción 2" },
  { value: "opcion3", label: "Opción 3" },
];

const SelectEjemplo = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <Select
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      isMulti
    />
  );
};

export default SelectEjemplo;
