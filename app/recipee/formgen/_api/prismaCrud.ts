"use server";
// import prisma from "@/libs/prisma";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { modelMap, TableName, supabase } from "../_types/formGen_setup";

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
    console.log("CREATE DATA______******", data);
    return await modelMap[table].create({ data });
  } else {
    throw new Error(`Insert Failed "${table}"`);
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
