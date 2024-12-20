import React, { useEffect, useState } from "react";

import { Link } from "react-router";
import { CountryV3Dto } from "../nagerDateApi";
import { HolidayComponent } from "./HolidayComponent";

/**
 *
 * @param {CountryV3Dto} param0
 * @returns
 */
function CountryNextHoliday({ country }) {
  const [holiday, setHoliday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country?.countryCode) {
      setLoading(false);
      setError("Invalid country");
      return;
    }

    const fetchNextHoliday = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://date.nager.at/api/v3/NextPublicHolidays/${country.countryCode}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const holidays = await response.json();
        setHoliday(holidays[0]); // Assume the first holiday is the next one
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNextHoliday();
  }, [country]);

  if (loading) {
    return <p>Loading next holiday...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!holiday) {
    return <p>No upcoming holidays found for {country.name}.</p>;
  }

  return (
    <div>
      <p>
        <Link to={`/country/${country.countryCode}`}>{country.name}</Link>
      </p>
      <HolidayComponent holiday={holiday} />
    </div>
  );
}

export { CountryNextHoliday };
