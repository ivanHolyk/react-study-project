import { create } from "zustand";

export const useHolidayStore = create((set, get) => ({
  holidays: [],
  fetchHoliday: (year, countryId) =>
    fetch(`${import.meta.env.VITE_API_URL}/PublicHolidays/${year}/${countryId}`)
      .then((r) => r.json())
      .then((h) =>
        set((state) => ({
          holidays: {
            ...state.holidays, // Preserve existing data
            [year]: h, // Update holidays for the specified year
          },
        }))
      ),
}));
