import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ToggleTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  };
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <FaSun size={20} className="text-yellow-500" />
      ) : (
        <FaMoon size={20} className="text-gray-700" />
      )}
    </button>
  );
};

export default ToggleTheme;
