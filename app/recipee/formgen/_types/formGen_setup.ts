import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

// // Initialize Prisma and Supabase clients
export const prisma = new PrismaClient();
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// TODO: For Image Uplaod
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// the URL to access table Define supported table names
export const TABLES = [
  "profile",
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

] as const;

export type TableName = (typeof TABLES)[number];

// Map with specific Prisma delegate types (example, adjust to your schema)
export const modelMap: {
  // eslint-disable-next-line no-unused-vars
  [key in TableName]: any; // Or use specific types like Prisma.CustomerDelegate
} = {
  profile: prisma.profiles,
  allergies: prisma.allergy,
  brands: prisma.brand,
  costrules: prisma.cost_rules,
  customers: prisma.customer,
  ingredients: prisma.ingredients,
  leads: prisma.lead,
  markuprules: prisma.markup,
  othercosts: prisma.other_costs,
  productionevents: prisma.production_event,
  packagingcosts: prisma.packaging_costs,
  recipes: prisma.recipe,
  recipebooks: prisma.recipe_book,
  recipeportions: prisma.recipe_portions,
  supplier: prisma.supplier,
  stock: prisma.stock,
  stocklocations: prisma.stock_location,
  stockminimum: prisma.stock_minimum,
  todos: prisma.todo,


  // Add remaining mappings
};
