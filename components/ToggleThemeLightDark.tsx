import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext } from "react";
import Pill from "@/components/Pill";
import { getTextTranslation } from "@/libs/utils";

interface ToggleThemeLightDarkProps {}

const ToggleThemeLightDark: React.FC<ToggleThemeLightDarkProps> = () => {
  // TOGGLE DARK & LIGHT THEME
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <Pill tone={theme === "dark" ? "dark" : "white"} className="text-xs" iconName={theme === "light" ? "visibility" : "visibility_off"} edit="" onClick={toggleTheme}>
        {theme === "light" ? <span className=" capitalize">{getTextTranslation("Light")}</span> : <span className=" capitalize">{getTextTranslation("Dark")}</span>}
      </Pill>
    </div>
  );
};

export default ToggleThemeLightDark;
