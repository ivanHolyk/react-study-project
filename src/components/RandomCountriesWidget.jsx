import { CountryV3Dto } from "../nagerDateApi";
import { useCountryStore } from "../store/country";
import { CountryNextHoliday } from "./CountryNextHoliday";

/**
 *
 * @param {Array<CountryV3Dto>} randomCountries
 * @returns
 */
function RandomCountriesWidget() {
  // const { randomCountries } = useCountryStore();
  const randomCountries = useCountryStore((state) => state.randomCountries); // Subscribe only to randomCountries

  return (
    <>
      <h3>Random countries widget</h3>
      <div>
        {randomCountries.map((rc, index) => (
          <CountryNextHoliday key={index} country={rc}></CountryNextHoliday>
        ))}
      </div>
    </>
  );
}
export { RandomCountriesWidget };
