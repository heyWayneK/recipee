import { useGetActiveTheme } from "@/contexts/useThemeDarkLight";
import React from "react";
import Pill from "@/components/Pill";
import { getTextTranslation } from "@/utils/utils";

interface ButtonThemeLightDarkProps {}

const ButtonThemeLightDark: React.FC<ButtonThemeLightDarkProps> = () => {
  // TOGGLE DARK & LIGHT THEME
  const { theme, toggleTheme } = useGetActiveTheme();

  return (
    <div>
      <Pill tone="white" className="" iconName={theme === "dark" ? "visibility" : "visibility_off"} edit="" onClick={toggleTheme}>
        {theme === "dark" ? <span className=" capitalize">{getTextTranslation("Light")}</span> : <span className=" capitalize">{getTextTranslation("Dark")}</span>}
      </Pill>
    </div>
  );
};

export default ButtonThemeLightDark;
