import { createSlice } from "@reduxjs/toolkit";

// Load theme from localStorage or default to "dark"
const initialTheme = localStorage.getItem("theme") || "dark";

const settingSlice = createSlice({
  name: "Setting",
  initialState: initialTheme,
  reducers: {
    toggleMode: (state) => {
      const newTheme = state === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme); // Save to localStorage
      return newTheme;
    },
  },
});

export const { toggleMode } = settingSlice.actions;
export default settingSlice.reducer;
