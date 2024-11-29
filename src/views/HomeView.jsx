import { useEffect } from "react";
import { useCountryStore } from "../store/country";
import { CountrySearchInput } from "../components/CountrySearchInput";
import { RandomCountriesWidget } from "../components/RandomCountriesWidget";
import { CountryList } from "../components/CountryList";

function HomeView() {
  const fetchCountries = useCountryStore((state) => state.fetchCountries); // Access the fetch action from the store

  const generateRandomCountriesId = useCountryStore(
    (state) => state.generateRandomCountriesId
  );
  useEffect(() => {
    generateRandomCountriesId();
    fetchCountries();
  }, []);

  return (
    <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
      <div style={{ maxWidth: "50%" }}>
        <CountrySearchInput />
        <CountryList></CountryList>
      </div>
      <div style={{ maxWidth: "50%" }}>
        <RandomCountriesWidget />
      </div>
    </div>
  );
}
export default HomeView;
