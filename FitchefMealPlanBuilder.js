// javascript

[
  {
    label: "My Goal",
    urlParam: "product_range",
    value: [
      { label: "Weight-Loss (FitChef)", value: "33" },
      { label: "Convenient Health", value: "27,33" },
      { label: "Small Portions (Healthy)", value: "27,33" },
      { label: "Large Portions (Budget)", value: "55" },
      { label: "Muscle-Gain", value: "27,33" },
      { label: "Pensioner Mixed", value: "21,55" },
      { label: "Bugdet-Buster Single Portion", value: "55" },
      { label: "Bugdet-Buster Large/Double Portion", value: "55" },
      { label: "Everything", value: "21,27,33,53,54,55" },
    ],
    default: "Convenient Health",
    description: "Number of days for the meal plan",
    type: "string",
  },
  {
    label: "People",
    urlParam: "days",
    value: [
      { label: "1-Person", value: "1" },
      { label: "2-People", value: "2" },
      { label: "3-People", value: "3" },
      { label: "4-People", value: "4" },
      { label: "5-People", value: "5" },
    ],
    default: "1-Person",
    description: "How Many People Will Eat This Meal Plan?",
    type: "number",
  },
  {
    label: "Time Period",
    urlParam: "days_per_week",
    value: [
      { label: "1-Week", value: "7" },
      { label: "2-Weeks", value: "14" },
      { label: "3-Weeks", value: "21" },
      { label: "1-Month", value: "21" },
      { label: "3-Months", value: "90" },
    ],
    default: "3-Weeks",
    description: "Number of days for the meal plan",
    type: "string",
  },
  {
    label: "Meal/Day",
    urlParam: "meals_per_day",
    value: [
      { label: "1-Week", value: "7" },
      { label: "2-Weeks", value: "14" },
      { label: "3-Weeks", value: "21" },
      { label: "1-Month", value: "21" },
      { label: "3-Months", value: "90" },
    ],
    default: "3-Weeks",
    description: "Number of days for the meal plan",
    type: "string",
  },
  {
    label: "Days/Week",
    urlParam: "days_per_week",
    value: [
      { label: "1-Day", value: 1 },
      { label: "2-Days", value: 2 },
      { label: "3-Days", value: 3 },
      { label: "4-Days", value: 4 },
      { label: "5-Days", value: 5 },
      { label: "6-Days", value: 6 },
      { label: "7-Days", value: 7 },
    ],
    default: "4-Days",
    description: "Number of days for the meal plan",
    type: "string",
  },
  {
    label: "Meal/Day",
    urlParam: "veg_animal",
    value: [
      { label: "Vegan", value: "1" },
      { label: "Vegetarian", value: "1,2" },
      { label: "Meat Only", value: "3" },
      { label: "All", value: "1,2,3" },
    ],
    default: ["All"],
    description: "Dietary preferences Vegetarian, Vegan, Non-Vegetarian)",
    type: "string",
  },

  {
    label: "Smoothie/Juices",
    urlParam: "drinks_per_day",
    value: [
      { label: "none", value: 0 },
      { label: "1/day", value: 1 },
      { label: "2/day", value: 2 },
    ],
    default: ["1/day"],
    description: "Add Smoothies or Juices to your meal plan",
    type: "number",
  },
  {
    label: "Extra Protein Packs",
    urlParam: "protein_packs_per_day",
    value: [
      { label: "none", value: 0 },
      { label: "1/day", value: 1 },
      { label: "2/day", value: 2 },
    ],
    default: ["none"],
    description: "Extra 100g Meat Protein Boost Packs",
    type: "number",
  },
  {
    label: "Allergys",
    urlParam: "allergies_ingredients",
    value: [
      { label: "None", value: "" },
      { label: "Milk (Dairy)", value: "1" },
      { label: "Eggs", value: "2" },
      { label: "Fish", value: "3" },
      { label: "Soya", value: "5" },
      { label: "Peanuts", value: "6" },
      { label: "Gluten", value: "7" },
      { label: "Garlic", value: "8" },
      { label: "Tree Nuts", value: "9" },
      { label: "Chilli", value: "11" },
      { label: "Sesame", value: "48" },
      { label: "Molluscs", value: "60" },
      { label: "Celery", value: "61" },
      { label: "Lupin (Bean/Legume)", value: "62" },
      { label: "Mustard", value: "63" },
      { label: "Crustaceans", value: "65" },
    ],
    default: ["None"],
    description: "Do you have a specific Allergies?",
    type: "string",
  },
  {
    label: "Advanced",
  },
  {
    label: "NUTRITIONAL TARGETS",
  },

  {
    label: "Calories",
    urlParam: "kcal_total_range",
    value: [
      { label: "all", value: "" },
      { label: "Weightloss", value: "0-450" },
      { label: "Weight Maintenance", value: "0-700" },
      { label: "Healthy Living", value: "200-650" },
      { label: "Convenience", value: "" },
      { label: "low ~1200-1600 kcal", value: "0-400" },
      { label: "medium ~2000 kcal", value: "300-650" },
      { label: "high ~3000 kcal", value: "400-1500" },
    ],
    default: ["All"],
    description: "Do you have a specific calorie target?",
    type: "string",
  },
  {
    label: "Carbs",
    urlParam: "total_carb_total_range",
    value: [
      { label: "All", value: "" },
      { label: "Low-carb", value: "0-35" },
      { label: "Strict Low-carb", value: "0-23" },
      { label: "Moderate Low-carb", value: "15-35" },
      { label: "Blood Sugar Control", value: "0-22" },
      { label: "LCHF", value: "0-17" },
    ],
    default: ["All"],
    description: "Do you have a specific carb target?",
    type: "string",
  },
  {
    label: "Protein",
    urlParam: "protein_total_range",
    value: [
      { label: "All", value: "" },
      { label: "Higher Protein", value: "20-100" },
      { label: "Higest Protein", value: "35-100" },
      { label: "Lower Protein", value: "0-24" },
    ],
    default: ["All"],
    description: "Do you have a specific protein target?",
    type: "string",
  },
  {
    label: "Sodium",
    urlParam: "sodium_total_range",
    value: [
      { label: "All", value: "" },
      { label: "Lower Sodium (<2400mg/day)", value: "0-800" },
    ],
    default: ["All"],
    description: "Do you have a specific sodium target?",
    type: "string",
  },
  {
    label: "COMMON DISLIKES",
  },
  {
    label: "Diet or Medical Type",
    urlParam: "common_dislikes",
    value: [
      { label: "None", value: "" },
      { label: "Atkins-Style", value: "28" },
      { label: "Whole 30", value: "29" },
      { label: "Zone Diet", value: "30" },
      { label: "Diabeties", value: "34" },
      { label: "Daniel Fast", value: "31" },
      { label: "Metabolic Syndrome", value: "x" },
      { label: "Reduced Fodmap", value: "25" },

      { label: "xx", value: "x" },
    ],
    default: ["None"],
    description: "Do you have a specific sodium target?",
    type: "string",
  },
  {
    label: "INTERMITTENT FASTING",
  },
  {
    label: "Intermittent Fasting",
    urlParam: "Intermittent_days_wweek",
    value: [
      { label: "None", value: "[0,0,0,0,0,0,0]" },
      { label: "One Day", value: "[1,0,0,0,0,0,0]" },
      { label: "Mon-Wed", value: "[1,1,1,0,0,0,0]" },
      { label: "Mon-Thurs", value: "[1,1,1,1,0,0,0]" },
    ],
    default: ["None"],
    description: "Do you have a specific sodium target?",
    type: "string",
  },
  {
    label: "EXCLUDED INGREDIENTS",
  },
  {
    label: "Excluded Ingredients",
    urlParam: "excluded_ingredients_id",
    value: [
      { label: "None", value: "" },
      { label: "Sample Ingredient 1", value: "11" },
      { label: "Sample Ingredient 2", value: "12" },
      { label: "Sample Ingredient 3", value: "13" },
    ],
    default: ["None"],
    description: "Do you have a specific sodium target?",
    type: "array",
  },

  {
    label: "EXCLUDED PRODUCTS",
  },

  {
    // This will be handled by our backend
    // Include as a placeholder for future use
    label: "meals_id_exclude",
    urlParam: "meals_id_exclude",
    value: "",
  },
  {
    // This will be handled by our backend
    // Include as a placeholder for future use

    label: "drinks_id_exclude",
    urlParam: "drinks_id_exclude",
    value: "",
  },
  {
    // This will be handled by our backend
    // Include as a placeholder for future use
    label: "snacks_id_exclude",
    urlParam: "snacks_id_exclude",
    value: "",
  },
];
