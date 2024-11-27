import { useEffect, useState } from "react";
import "./App.css";
import { useCountryStore } from "./store/country";
import CountryNextHoliday from "./CountryNextHoliday";

function App() {
  const countries = useCountryStore((state) => state.countries); // Access the countries from the store
  const fetchCountries = useCountryStore((state) => state.fetchCountries); // Access the fetch action from the store
  const randomCountries = useCountryStore((state) => state.randomCountries);
  const generateRandomCountriesId = useCountryStore(
    (state) => state.generateRandomCountriesId
  );
  const [filteredCountries, setfilteredCountries] = useState(countries);
  const [inputCountry, setInputCountry] = useState("");

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    setfilteredCountries(countries);
  }, [countries]);

  useEffect(() => {
    setfilteredCountries(
      countries.filter(
        (c) =>
          c.name.toLowerCase().includes(inputCountry.toLowerCase()) ||
          c.countryCode.toLowerCase().includes(inputCountry.toLowerCase())
      )
    );
  }, [inputCountry]);

  useEffect(() => {
    generateRandomCountriesId();
  }, []);

  /**
   *
   * @param {InputEvent} event
   */
  const handleInputChange = (event) => {
    setInputCountry(event.target.value);

    console.log("upd: ", event.target.value);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
        <div style={{ maxWidth: "50%" }}>
          <input
            placeholder="Search for a country..."
            onChange={handleInputChange}
          />
          <div>
            Countries list:
            {filteredCountries.length}
            <ul>
              {filteredCountries && filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <li
                    key={index}
                  >{`${country.countryCode} - ${country.name}`}</li>
                ))
              ) : (
                <p>No countries</p>
              )}
            </ul>
          </div>
        </div>
        <div style={{ maxWidth: "50%" }}>
          <h3>Random countries widget</h3>
          <div>
            {randomCountries.map((rc) => (
              <CountryNextHoliday country={rc}></CountryNextHoliday>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
