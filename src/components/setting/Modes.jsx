import React, { useState, useEffect } from "react";

const Modes = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleLightDark = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="p-4 min-h-screen bg-base-100 text-base-content">
      <h1 className="text-2xl font-bold mb-6 text-center">Toggle Theme</h1>

      <div className="flex justify-center items-center gap-4">
        <span className="font-medium">Light</span>
        <input
          type="checkbox"
          className="toggle toggle-lg"
          checked={theme === "dark"}
          onChange={toggleLightDark}
        />
        <span className="font-medium">Dark</span>
      </div>
    </div>
  );
};

export default Modes;
