import React from "react";

type FractionProps = {
  numerator: number | string;
  denominator: number | string;
};

const UnitFractions: React.FC<FractionProps> = ({ numerator, denominator }): React.ReactNode => {
  // ½, ⅓, ⅔, ¼, ¾, ⅕, ⅖, ⅗, ⅘, ⅙, ⅚, ⅛, ⅜, ⅝, ⅞
  const unicodeFractions: { [key: string]: string } = {
    "1/2": "½",
    "1/3": "⅓",
    "2/3": "⅔",
    "1/4": "¼",
    "3/4": "¾",
    // ... add other common fractions
  };

  const fractionString: string = `${numerator.toString()}/${denominator.toString()}`;

  if (unicodeFractions[fractionString]) {
    return <span>{unicodeFractions[fractionString]}</span>;
  }

  // Fallback for less common fractions
  return (
    <span>
      <sup>{numerator}</sup>&frasl;<sub>{denominator}</sub>
    </span>
  );
};

export default UnitFractions;
