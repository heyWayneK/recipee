// USER THIS FILE FOR ALL PRISMA RELATED DB INSERTS OR UPDATES

import { Prisma } from "@prisma/client";
// Prisma validator Types.
// These Types are based on the Prisma Model used for getting json data

// RECIPE_DETAIL_ROW WITH ALL RELATIONS__________________________START::
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
// RECIPE_DETAIL_ROW WITH ALL RELATIONS__________________________END::

//

// RECIPE_PORTIONS WITH ALL RELATIONS__________________________END::

// 1. Define an object that includes the relations you want
const recipe_portionsWithPostsArgs = Prisma.validator<Prisma.recipe_portionsDefaultArgs>()({
  include: {
    // List the types where you want to include the @relational data rows
    // This will be include the full object of the relation
    // recipe_uuid: true,
  },
});
// 2. Create your reusable type using GetPayload
export type Recipe_portionsPosts = Prisma.recipe_portionsGetPayload<typeof recipe_portionsWithPostsArgs>;

// RECIPE_PORTIONS WITH ALL RELATIONS__________________________END::

//

// component_portion_on_recipe WITH ALL RELATIONS__________________________END::

// 1. Define an object that includes the relations you want
const Component_portion_on_recipeWithPostsArgs = Prisma.validator<Prisma.component_portion_on_recipeDefaultArgs>()({
  include: {
    // List the types where you want to include the @relational data rows
    // This will be include the full object of the relation
    // recipe_uuid: true,
  },
});
// 2. Create your reusable type using GetPayload
export type component_portion_on_recipePosts = Prisma.component_portion_on_recipeGetPayload<typeof Component_portion_on_recipeWithPostsArgs>;

// component_portion_on_recipe WITH ALL RELATIONS__________________________END::
