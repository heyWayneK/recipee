// Card CATEGORIES Type
export type categoryType = {
  slug: string;
  title: string;
  titleShort?: string;
  description: string;
  descriptionShort?: string;
};

// 2 Card CATEGORIES
const categorySlugs: {
  [key: string]: string;
} = {
  feature: "features",
  tutorial: "tutorials",
};

// All categories blogs are in the /blog/category/[categoryId].js pages.
export const categories: categoryType[] = [
  {
    slug: categorySlugs.feature,
    title: "Recipee - Easy Complete",
    titleShort: "Features",
    description:
      "Check out the latest features we've added to MicroSassFast. I'm continually enhancing our product to help you launch faster.",
    descriptionShort: "Latest features added to MicroSassFast.",
  },
  {
    slug: categorySlugs.tutorial,
    title: "Recipee - How Tos & Tutorials",
    titleShort: "Tutorials",
    description:
      "Learn how to use MicroSassFast with these step-by-step tutorials. I'll guide you on how to ship faster and save time.",
    descriptionShort:
      "Learn how to use MicroSassFast with these step-by-step tutorials.",
  },
];
