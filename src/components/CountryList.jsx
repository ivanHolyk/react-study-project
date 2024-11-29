import { useCountryStore } from "../store/country";
import { CountryListItem } from "./CountryListItem";
function CountryList() {
  const filteredCountries = useCountryStore((state) => state.filteredCountries);
  return (
    <div>
      {`Countries list: ${filteredCountries.length}`}
      <ul>
        {filteredCountries && filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <li key={index}>
              <CountryListItem country={country}></CountryListItem>
            </li>
          ))
        ) : (
          <p>No countries</p>
        )}
      </ul>
    </div>
  );
}
export { CountryList };
