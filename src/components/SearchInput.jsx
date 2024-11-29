import React from "react";

/**
 * A reusable search input component.
 *
 * @param {Object} props - The props for the SearchInput component.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {string} [props.placeholder] - Optional placeholder text for the input.
 * @param {string} [props.value] - Optional controlled value for the input.
 */
const SearchInput = ({ onChange, placeholder = "Search...", value }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "0.5rem",
        fontSize: "1rem",
        border: "1px solid #ced4da",
        borderRadius: "4px",
      }}
    />
  );
};

export { SearchInput };
