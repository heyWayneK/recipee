export interface unitDetailProps {
  unit: string[];
}

export interface unitProps {
  weight: unitDetailProps[];
  liquid: unitDetailProps[];
  length: unitDetailProps[];
  temperature: unitDetailProps[];
}

export interface metricImperialProps {
  metric: unitProps;
  imperial: unitProps;
}

export const metricImperial = {
  metric: {
    weight: ["g", "kg"],
    liquid: ["mL", "L"],
    length: ["mm", "cm"],
    temperature: ["°C", "°C"],
  },
  imperial: {
    weight: ["g", "kg"],
    liquid: ["oz", "lbs"],
    length: ["in", "in"],
    temperature: ["°F", "°F"],
  },
};

/**
 * 

Weight:

1 ounce (oz) ≈ 28.35 grams (g)
1 pound (lb) ≈ 453.59 grams (g) or 0.45 kilograms (kg)

Volume:
1 teaspoon (tsp) ≈ 5 milliliters (mL)
1 tablespoon (tbsp) ≈ 15 milliliters (mL)
1 fluid ounce (fl oz) ≈ 29.57 milliliters (mL)
1 cup (c) ≈ 240 milliliters (mL)
1 pint (pt) ≈ 473 milliliters (mL)
1 quart (qt) ≈ 946 milliliters (mL)
1 gallon (gal) ≈ 3.785 liters (L)

Temperature:

°C = (°F - 32) × 5/9
°F = (°C × 9/5) + 32

 Metric Units
The metric system is based on units of 10 and is widely used globally. Common units include:

Weight (Mass):
Gram (g): Used for small quantities (e.g., spices, flour).
Kilogram (kg): Used for larger quantities (e.g., meat, vegetables).

Volume:
Milliliter (mL): Used for small liquid quantities (e.g., vanilla extract, water).
Liter (L): Used for larger liquid quantities (e.g., milk, broth).

Length:
Millimeter (mm): Rarely used in food but can describe thickness.
Centimeter (cm): Used for sizing (e.g., cake diameter).

Temperature:
Celsius (°C): Used for cooking and baking temperatures.

Imperial Units

Weight (Mass):
Ounce (oz): 
Pound (lb): 

Volume:
Teaspoon (tsp): Used for small liquid or dry quantities (e.g., salt, vanilla extract).
Tablespoon (tbsp): Used for slightly larger quantities (e.g., oil, sugar).
Fluid Ounce (fl oz): Used for liquid measurements (e.g., milk, juice).
Cup (c): Used for both dry and liquid ingredients (e.g., flour, water).
Pint (pt): Used for larger liquid quantities (e.g., cream, beer).
Quart (qt): Used for even larger quantities (e.g., soup, stock).
Gallon (gal): Used for very large quantities (e.g., milk, water).

Length:
Inch (in): Used for sizing (e.g., pie diameter).

Temperature:
Fahrenheit (°F): Used for cooking and baking temperatures.

 */
