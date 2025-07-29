import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "dark";

const settingSlice = createSlice({
  name: "Setting",
  initialState: initialTheme,
  reducers: {
    toggleMode: (state) => {
      const newTheme = state === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    },
  },
});

export const { toggleMode } = settingSlice.actions;
export default settingSlice.reducer;
