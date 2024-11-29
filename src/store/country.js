import { create } from "zustand";
import { apiHandler, CountryInfoDto, CountryV3Dto } from "../nagerDateApi";

function generateUniqueRandomIndexes(runs, maxIndex) {
  if (runs > maxIndex) {
    console.warn("Requested more random countries than available.");
    runs = maxIndex;
  }

  let result = new Set();
  while (result.size < runs) {
    result.add(getRandomInt(0, maxIndex));
  }

  return Array.from(result);
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export const useCountryStore = create((set, get) => ({
  countries: [],
  /**
   * @type {CountryInfoDto}
   */
  country: undefined,
  randomCountriesId: [],
  randomCountries: [],
  inputCountry: "",
  filteredCountries: [],
  setInputCountry: (input) => {
    set((state) => ({
      inputCountry: input,
      filteredCountries: state.countries.filter(
        (c) =>
          c.name.toLowerCase().includes(input.toLowerCase()) ||
          c.countryCode.toLowerCase().includes(input.toLowerCase())
      ),
    }));
  },
  generateRandomCountriesId: (force = false) => {
    const { countries, randomCountriesId } = get();
    const result =
      countries.length > 0
        ? generateUniqueRandomIndexes(
            import.meta.env.VITE_RANDOM_COUNTRIES_AMOUNT,
            countries.length
          )
        : [];

    if (force || randomCountriesId.length === 0) {
      set({
        randomCountriesId: result,
        randomCountries: result.map((id) => countries[id]),
      });
    }
  },

  fetchCountries: async () => {
    try {
      const countries = await apiHandler.getAvailableCountries();
      set({ countries, filteredCountries: countries });

      // Automatically generate random countries after fetching if not already set
      if (get().randomCountriesId.length === 0) {
        get().generateRandomCountriesId();
      }
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  },

  fetchCountry: async (countryCode) => {
    try {
      const country = await apiHandler.getCountryInfo(countryCode);
      set({ country });
    } catch (error) {
      console.error(`Failed to fetch country info for ${countryCode}:`, error);
    }
  },
}));
