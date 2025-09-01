// Prisma validator Types.
// These Types are based on the Prisma Model used for getting json data

import { Prisma } from "@prisma/client";

// START RECIPE DETAIL_ROW WITçH ALL RELATIONS__________________________START::

// 1. Define an object that includes the relations you want
const recipe_detail_rowWithPostsArgs = Prisma.validator<Prisma.recipe_detail_rowDefaultArgs>()({
  include: {
    // List the types where you want to include the @relational data rows
    // This will be include the full object of the relation
    instruction: true,
    ingredients: true,
    dry_cooked_yield: true,
    cooking_method_yields: true,
    ingredient_type: true,
    salt_purpose: true,
    oil_purpose: true,
    fq_score: true,
    home_mode_units: true,
  },
});
// 2. Create your reusable type using GetPayload
export type Recipe_detail_rowPosts = Prisma.recipe_detail_rowGetPayload<typeof recipe_detail_rowWithPostsArgs>;

// END RECIPE DETAIL_ROW WITH ALL RELATIONS__________________________END::
