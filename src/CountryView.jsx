import { useParams } from "react-router-dom";
import { useCountryStore } from "./store/country";
import { useHolidayStore } from "./store/holiday";
import Holiday from "./HolidayComponent";
import { useState, useEffect } from "react";
import { CountryInfoDto } from "./nagerDateApi";

export function CountryView() {
  const { id } = useParams();
  /**
   * @type { CountryInfoDto}
   */
  const { country } = useCountryStore();
  const { fetchCountry } = useCountryStore();
  const currentYear = new Date().getFullYear();
  const [activeHolidayYear, setActiveHolidayYear] = useState(currentYear);
  const { holidays, fetchHoliday } = useHolidayStore();
  const holidaysByYear = holidays[activeHolidayYear] || [];

  useEffect(() => {
    fetchCountry(id);
  }, [fetchCountry, id]); // Ensure fetchCountry is called when the component mounts or `id` changes

  useEffect(() => {
    fetchHoliday(currentYear, id);
  }, [fetchHoliday, currentYear, id]); // Fetch holidays for the current year on component mount

  const yearButtonHandler = (year) => {
    setActiveHolidayYear(year);
    if (!holidays[year]) {
      fetchHoliday(year, id);
    }
  };

  return (
    <main>
      <h3>Country: {country?.commonName}</h3>
      {/* <h3>Country: {JSON.stringify(country)}</h3> */}

      <div className="mb-1 d-inline-block">
        {Array.from({ length: 11 }, (_, i) => {
          const year = 2019 + i;
          return (
            <button
              key={year}
              className={`btn btn-outline-secondary me-1 ${
                year === activeHolidayYear ? "active" : ""
              }`}
              onClick={() => yearButtonHandler(year)}
            >
              {year}
            </button>
          );
        })}
      </div>
      <div>
        {holidaysByYear.map((h, index) => (
          <div key={index} className="border rounded mb-1">
            <Holiday holiday={h}></Holiday>
          </div>
        ))}
      </div>
    </main>
  );
}

export default CountryView;
