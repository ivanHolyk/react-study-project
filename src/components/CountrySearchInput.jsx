import { useCountryStore } from "../store/country";
import { SearchInput } from "./SearchInput";
function CountrySearchInput() {
  const inputCountry = useCountryStore((state) => state.inputCountry);
  const setInputCountry = useCountryStore((state) => state.setInputCountry);

  /**
   *
   * @param {InputEvent} event
   */
  const handleInputChange = (event) => {
    setInputCountry(event.target.value);

    console.log("upd: ", event.target.value);
  };
  return (
    <SearchInput
      placeholder="Search for a country..."
      onChange={handleInputChange}
      value={inputCountry}
    ></SearchInput>
  );
}
export { CountrySearchInput };
