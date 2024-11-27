import axios from "axios";

export class Country {
  constructor(countryCode) {
    this.countryCode = countryCode; // Set the country code
    this.commonName = null;
    this.officialName = null;
    this.region = null;
    this.borders = null;
  }

  // Fetch country info based on the country code
  async fetchCountryInfo(baseApiUrl) {
    const baseApiUrl = import.meta.env.VITE_API_URL; // Access the base API URL from .env

    try {
      const response = await axios.get(
        `${baseApiUrl}/CountryInfo/${this.countryCode}`
      );

      if (response.data) {
        this.commonName = response.data.commonName;
        this.officialName = response.data.officialName;
        this.region = response.data.region;
        this.borders = response.data.borders || [];
      } else {
        throw new Error("No country data found.");
      }
    } catch (error) {
      console.error(
        `Error fetching country info for code ${this.countryCode}:`,
        error
      );
      throw error;
    }
  }

  // Display country details
  display() {
    console.log(`Country Code: ${this.countryCode}`);
    console.log(`Common Name: ${this.commonName}`);
    console.log(`Official Name: ${this.officialName}`);
    console.log(`Region: ${this.region}`);
    console.log(
      `Borders: ${
        this.borders?.map((border) => border.commonName).join(", ") || "None"
      }`
    );
  }
}
