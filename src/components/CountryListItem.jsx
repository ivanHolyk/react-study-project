import { Link } from "react-router";
import { CountryV3Dto } from "../nagerDateApi";

/**
 *
 * @param {CountryV3Dto} country
 */
function CountryListItem({ country }) {
  return (
    <Link to={`/country/${country.countryCode}`}>
      {`${country.countryCode} - ${country.name}`}
    </Link>
  );
}
export { CountryListItem };
