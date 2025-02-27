"use server";
// import prisma from "@/libs/prisma";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

// // Initialize Prisma and Supabase clients
const prisma = new PrismaClient();
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// TODO: Not sure if I am using the rightvars here
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// the URL to access table Define supported table names
const TABLES = [
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
const modelMap: {
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

/**
 * Fetch all rows from a specified table
 * @param table Name of the table
 * @returns Array of records
 */
export async function getAll(table: TableName) {
  if (table in modelMap) {
    return await modelMap[table].findMany();
  } else {
    throw new Error(`Table "${table}" : Connection to db failed`);
  }
}

/**
 * Fetch a single row from a table by ID
 * @param table Name of the table
 * @param id ID of the record
 * @returns Single record or null if not found
 */
export async function getOne(table: TableName, id: number) {
  if (table in modelMap) {
    return await modelMap[table].findUnique({ where: { id } });
  } else {
    throw new Error(`Table "${table}" is not supported`);
  }
}

/**
 * Insert a new record into a table
 * @param table Name of the table
 * @param data Data to insert
 * @returns Created record
 */
export async function create(table: TableName, data: any) {
  if (table in modelMap) {
    return await modelMap[table].create({ data });
  } else {
    throw new Error(`Table Insert Failed "${table}"`);
  }
}

/**
 * Update an existing record in a table
 * @param table Name of the table
 * @param id ID of the record to update
 * @param data Data to update
 * @returns Updated record
 */
export async function update(table: TableName, id: number, data: any) {
  if (table in modelMap) {
    return await modelMap[table].update({ where: { id }, data });
  } else {
    throw new Error(`Table "${table}" error with update()`);
  }
}

/**
 * Delete a record from a table
 * @param table Name of the table
 * @param id ID of the record to delete
 * @returns Deleted record
 */
export async function deleteOne(table: TableName, id: number) {
  if (table in modelMap) {
    return await modelMap[table].delete({ where: { id } });
  } else {
    throw new Error(`Table "${table}" error with deleteOne()`);
  }
}

/**
 * Upload an image to Supabase Storage and return its public URL
 * @param file File object to upload
 * @returns Public URL of the uploaded image
 */
export async function uploadImage(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("images").upload(fileName, file);
  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
  const { publicURL }: any = supabase.storage.from("recipee").getPublicUrl(fileName);
  if (!publicURL) {
    throw new Error("Failed to retrieve public URL for the uploaded image");
  }
  return publicURL;
}
