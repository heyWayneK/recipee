import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

// // Initialize Prisma and Supabase clients
export const prisma = new PrismaClient();
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// TODO: For Image Uplaod
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// the URL to access table Define supported table names
export const TABLES = [
  "account",
  "allergies",
  "brands",
  "costrules",
  "customers",

  "ingredients",
  "leads",
  "markuprules",
  "othercosts",
  "productionevents",
  "packagingcosts",
  "recipes",
  "recipebooks",
  "recipeportions",
  "supplier",
  "stock",
  "stocklocations",
  "stockminimum",
  "todos",
  "user",
] as const;

export type TableName = (typeof TABLES)[number];

// Map with specific Prisma delegate types (example, adjust to your schema)
export const modelMap: {
  // eslint-disable-next-line no-unused-vars
  [key in TableName]: any; // Or use specific types like Prisma.CustomerDelegate
} = {
  account: prisma.account,
  allergies: prisma.allergy,
  brands: prisma.brand,
  costrules: prisma.costRules,
  customers: prisma.customer,
  ingredients: prisma.ingredients,
  leads: prisma.lead,
  markuprules: prisma.markup,
  othercosts: prisma.otherCosts,
  productionevents: prisma.productionEvent,
  packagingcosts: prisma.packagingCosts,
  recipes: prisma.recipe,
  recipebooks: prisma.recipeBook,
  recipeportions: prisma.recipePortions,
  supplier: prisma.supplier,
  stock: prisma.stock,
  stocklocations: prisma.stockLocation,
  stockminimum: prisma.stockMinimum,
  todos: prisma.todo,
  user: prisma.user,

  // Add remaining mappings
};
