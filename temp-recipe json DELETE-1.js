const data = {
  uuid: "",
  name: "",
  desc: "",
  portions: [],
  packagingCostsId: [],
  otherCostsId: [],
  markupId: [],
  vatRulesId: [],
  components: [
    {
      // component info 1
    },
    {
      // component info 2
    },
    {
      // component info 3 etc
    },
  ],

  recipes: [
    {
      name: "RECIPE 1 From component",
      uuid: "77442-666",
      costPer1000: 43.7,
      brand: {
        // Brand info
      },
      customer: {
        // Customer info
      },
      method: "Cooked",

      recipeDetail: [
        {
          // Ingredient info 1
        },
        {
          // ingredient info 2
        },
        {
          // Ingredient info 3
        },
      ],
    },
    {
      name: "RECIPE 2 From component",
      uuid: "77442-667",
      costPer1000: 41.2,
      brand: {
        // Brand info
      },
      customer: {
        // Customer info
      },
      method: "Cooked",

      recipeDetail: [
        {
          // Ingredient info 1
        },
        {
          // ingredient info 2
        },
        {
          // Ingredient info 3
        },
      ],
    },
  ],
};
