import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export class CountryInfoDto {
  constructor({
    commonName = null,
    officialName = null,
    countryCode = null,
    region = null,
    borders = null,
  } = {}) {
    this.commonName = commonName;
    this.officialName = officialName;
    this.countryCode = countryCode;
    this.region = region;
    this.borders = borders;
  }
}

export class CountryV3Dto {
  constructor({ countryCode = null, name = null } = {}) {
    this.countryCode = countryCode;
    this.name = name;
  }
}

export const HolidayTypes = {
  Public: "Public",
  Bank: "Bank",
  School: "School",
  Authorities: "Authorities",
  Optional: "Optional",
  Observance: "Observance",
};

export class LongWeekendV3Dto {
  constructor({
    startDate = null,
    endDate = null,
    dayCount = null,
    needBridgeDay = false,
    bridgeDays = null,
  } = {}) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.dayCount = dayCount;
    this.needBridgeDay = needBridgeDay;
    this.bridgeDays = bridgeDays;
  }
}

export class PublicHolidayV3Dto {
  constructor({
    date = null,
    localName = null,
    name = null,
    countryCode = null,
    fixed = false,
    global = false,
    counties = null,
    launchYear = null,
    types = null,
  } = {}) {
    this.date = date;
    this.localName = localName;
    this.name = name;
    this.countryCode = countryCode;
    this.fixed = fixed;
    this.global = global;
    this.counties = counties;
    this.launchYear = launchYear;
    this.types = types;
  }
}

export class VersionInfoDto {
  constructor({ name = null, version = null } = {}) {
    this.name = name;
    this.version = version;
  }
}

export const apiHandler = {
  async getCountryInfo(countryCode) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/CountryInfo/${countryCode}`
      );
      return new CountryInfoDto(response.data);
    } catch (error) {
      console.error("Error fetching country info:", error);
      throw error;
    }
  },

  async getAvailableCountries() {
    try {
      const response = await axios.get(`${API_BASE_URL}/AvailableCountries`);
      return response.data.map((country) => new CountryV3Dto(country));
    } catch (error) {
      console.error("Error fetching available countries:", error);
      throw error;
    }
  },

  async getLongWeekends(
    year,
    countryCode,
    availableBridgeDays = 1,
    subdivisionCode = null
  ) {
    try {
      const params = { availableBridgeDays, subdivisionCode };
      const response = await axios.get(
        `${API_BASE_URL}/LongWeekend/${year}/${countryCode}`,
        { params }
      );
      return response.data.map((weekend) => new LongWeekendV3Dto(weekend));
    } catch (error) {
      console.error("Error fetching long weekends:", error);
      throw error;
    }
  },

  async getPublicHolidays(year, countryCode) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/PublicHolidays/${year}/${countryCode}`
      );
      return response.data.map((holiday) => new PublicHolidayV3Dto(holiday));
    } catch (error) {
      console.error("Error fetching public holidays:", error);
      throw error;
    }
  },

  async isTodayPublicHoliday(countryCode, countyCode = null, offset = 0) {
    try {
      const params = { countyCode, offset };
      const response = await axios.get(
        `${API_BASE_URL}/IsTodayPublicHoliday/${countryCode}`,
        { params }
      );
      return response.status === 200;
    } catch (error) {
      console.error("Error checking if today is a public holiday:", error);
      throw error;
    }
  },

  async getNextPublicHolidays(countryCode) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/NextPublicHolidays/${countryCode}`
      );
      return response.data.map((holiday) => new PublicHolidayV3Dto(holiday));
    } catch (error) {
      console.error("Error fetching next public holidays:", error);
      throw error;
    }
  },

  async getNextPublicHolidaysWorldwide() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/NextPublicHolidaysWorldwide`
      );
      return response.data.map((holiday) => new PublicHolidayV3Dto(holiday));
    } catch (error) {
      console.error("Error fetching worldwide public holidays:", error);
      throw error;
    }
  },

  async getVersion() {
    try {
      const response = await axios.get(`${API_BASE_URL}/Version`);
      return new VersionInfoDto(response.data);
    } catch (error) {
      console.error("Error fetching API version:", error);
      throw error;
    }
  },
};
