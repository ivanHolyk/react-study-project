import React from "react";
import { PublicHolidayV3Dto } from "./nagerDateApi";
/**
 * Component for displaying a holiday.
 *
 * @param {{ holiday: PublicHolidayV3Dto }} props - The props for the Holiday component.
 * @returns {JSX.Element} The rendered Holiday component.
 */
function Holiday({ holiday }) {
  return (
    <div>
      {holiday.name}, {holiday.localName}
      <br />
      {holiday.date}
      <br />
      {holiday.types.map((type, index) => (
        <span key={index} className="badge text-bg-secondary">
          {type}
        </span>
      ))}
    </div>
  );
}

export default Holiday;
