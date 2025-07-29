import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../../utilis/settingSlice";

const Modes = () => {
  const theme = useSelector((state) => state.Setting);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div className="p-4 min-h-screen bg-base-100 text-base-content">
      <h1 className="text-2xl font-bold mb-6 text-center">Toggle Theme</h1>

      <div className="flex justify-center items-center gap-4">
        <span className="font-medium">Light</span>
        <input
          type="checkbox"
          className="toggle toggle-lg"
          checked={theme === "dark"}
          onChange={() => dispatch(toggleMode())}
        />
        <span className="font-medium">Dark</span>
      </div>
    </div>
  );
};

export default Modes;
