import { ThemeContext } from "@/contexts/ThemeContext";
import React, { ReactNode, useContext } from "react";
import Pill from "@/components/Pill";
import { getTextTranslation } from "@/libs/utils";

interface ToggleThemeLightDarkProps {
  className?: string;
}
const ToggleThemeLightDark: React.FC<ToggleThemeLightDarkProps> = ({ className = "" }) => {
  // TOGGLE DARK & LIGHT THEME
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  //   const handleLightDarkMode = (currentMode: string) => {
  //     if (currentMode === "light") {
  //       document.documentElement.setAttribute("data-theme", "dark");
  //       localStorage.setItem("lightDarkMode", "dark");
  //     } else {
  //       document.documentElement.setAttribute("data-theme", "light");
  //       localStorage.setItem("lightDarkMode", "light");
  //     }
  //   };
  return (
    <div>
      <Pill tone={theme === "dark" ? "dark" : "white"} className="text-xs" iconName={theme === "light" ? "visibility" : "visibility_off"} edit="" onClick={toggleTheme}>
        {theme === "light" ? <span className=" capitalize">{getTextTranslation("Light")}</span> : <span className=" capitalize">{getTextTranslation("Dark")}</span>}
      </Pill>
    </div>
  );
};

export default ToggleThemeLightDark;
