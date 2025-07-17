import { PrismaClient } from "@prisma/client";
import Decimal from "decimal.js";

// TESTING: test Prisma Client Connection
// TESTING: nc -zv aws-0-eu-west-1.pooler.supabase.com 6543

// INFO: Ensure Single Prisma Client Instance
// INFO: Don’t create a new PrismaClient in every API request.
// INFO: Use a singleton pattern:
// INFO: TO AVOID THIS ERROR (TOO MANY CONNECTIONS:
// INFO: prisma:info Starting a postgresql pool with 21 connections.

// Extend the Node.js Global interface to include prisma

// // Wayne new singleton pattern - gave problems with Prisma Client
// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

// // Initialize Prisma Client with singleton pattern and jsonProtocol
// const prisma =
//   global.prisma ||
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : [],
//     datasources: {
//       db: {
//         url: "postgresql://postgres.zozztsfhpsotmekjeiwt:U9c3eWo6bExDoVKd@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
//       },
//     },
//   });

// // Cache the Prisma instance in development
// if (process.env.NODE_ENV !== "production") {
//   global.prisma = prisma;
// }

// WAYNES OLDER VERSION

// Extend the Node.js Global interface to include prsisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Initialize prisma as a PrismaClient type
let prisma: PrismaClient;

// Singleton pattern for PrismaClient to avoid multiple connections
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    // log: ["query", "info", "warn", "error"], // Enable all log levels
    datasources: {
      db: {
        // url: process.env.DATABASE_URL,
        url: "postgresql://postgres.zozztsfhpsotmekjeiwt:U9c3eWo6bExDoVKd@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
      },
    },
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"], // Enable all log levels
      datasources: {
        db: {
          // url: process.env.DATABASE_URL,
          url: "postgresql://postgres.zozztsfhpsotmekjeiwt:U9c3eWo6bExDoVKd@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
        },
      },
    });
  }
  prisma = global.prisma;
}

// MIDDLEWARE__________________________________________ TESTS

// // Recursive function to convert Decimal types to strings
// async function convertDecimalsToStrings(obj: any, depth: number = 0): Promise<any> {
//   "use server";
//   const indent = "  ".repeat(depth); // For debugging indentation
//   console.log(`${indent}Processing object at depth ${depth}:`, obj);

//   // Handle null or non-object types
//   if (obj === null || typeof obj !== "object") {
//     if (obj instanceof Decimal) {
//       console.log(`${indent}Found Decimal:`, obj, "-> Converting to string");
//       return obj.toString();
//     }
//     console.log(`${indent}Non-object value:`, obj);
//     return obj;
//   }

//   // Handle arrays
//   if (Array.isArray(obj)) {
//     console.log(`${indent}Processing array:`, obj);
//     return obj.map((item, index) => {
//       console.log(`${indent}Array item[${index}]:`, item);
//       return convertDecimalsToStrings(item, depth + 1);
//     });
//   }

//   // Handle objects
//   console.log(`${indent}Processing object:`, obj);
//   const result: Record<string, any> = {};
//   for (const [key, value] of Object.entries(obj)) {
//     console.log(`${indent}Key: ${key}, Value:`, value);
//     if (value instanceof Decimal) {
//       console.log(`${indent}Converting Decimal for key ${key}:`, value);
//       result[key] = value.toString();
//     } else if (value !== null && typeof value === "object") {
//       result[key] = convertDecimalsToStrings(value, depth + 1);
//     } else {
//       result[key] = value;
//     }
//   }
//   console.log(`${indent}Resulting object:`, result);
//   return result;
// }

// // Prisma middleware
// prisma.$use(async (params, next) => {
//   "use server";
//   console.log("Middleware triggered for action:", params.action, "model:", params.model);

//   // Execute the query
//   const result = await next(params);
//   console.log("Raw Prisma result:", result);

//   // Apply Decimal conversion to query results
//   if (
//     params.action.startsWith("find") || // findMany, findFirst, findUnique, etc.
//     params.action === "aggregate" ||
//     params.action === "groupBy" ||
//     params.action === "count"
//   ) {
//     if (Array.isArray(result)) {
//       console.log("Processing array result");
//       return result.map((item, index) => {
//         console.log(`Processing item[${index}]:`, item);
//         return convertDecimalsToStrings(item, 1);
//       });
//     } else if (result && typeof result === "object") {
//       console.log("Processing single object result");
//       return convertDecimalsToStrings(result, 1);
//     } else {
//       console.log("Result is not an object or array:", result);
//       return result;
//     }
//   }

//   console.log("Returning unmodified result for action:", params.action);
//   return result;
// });

// // Recursive function to convert Decimal types to strings
// async function convertDecimalsToStrings(obj: any): any {
//   "use server";
//   // Handle null or non-object types
//   if (obj === null || typeof obj !== "object") {
//     // Check if the value is a Prisma Decimal
//     if (obj instanceof Decimal) {
//       return obj.toString();
//     }
//     return obj;
//   }

//   // Handle arrays
//   if (Array.isArray(obj)) {
//     return obj.map((item) => convertDecimalsToStrings(item));
//   }

//   // Handle objects
//   const result: Record<string, any> = {};
//   for (const [key, value] of Object.entries(obj)) {
//     if (value instanceof Decimal) {
//       result[key] = value.toString();
//     } else if (typeof value === "object" && value !== null) {
//       result[key] = convertDecimalsToStrings(value);
//     } else {
//       result[key] = value;
//     }
//   }
//   return result;
// }

// // Prisma middleware to apply the conversion
// prisma.$use(async (params, next) => {
//   "use server";
//   const result = await next(params);

//   // Apply conversion to query results for find operations
//   if (
//     params.action.startsWith("find") || // Covers findMany, findFirst, findUnique, etc.
//     params.action === "aggregate" ||
//     params.action === "groupBy" ||
//     params.action === "count"
//   ) {
//     if (Array.isArray(result)) {
//       // Handle array results (e.g., findMany)
//       return result.map((item) => convertDecimalsToStrings(item));
//     } else if (result && typeof result === "object") {
//       // Handle single object results (e.g., findFirst, findUnique)
//       return convertDecimalsToStrings(result);
//     }
//   }

//   return result;
// });

// Middleware to handle Decimal.js serialization

// /**
//  * Recursively traverses an object or array and converts all
//  * instances of Decimal.js to their string representation. This is
//  * necessary before sending data to a client component, as Decimals
//  * are not serializable by React Server Components.
//  * @param data The data to process (e.g., a Prisma query result).
//  * @returns The processed data with Decimals converted to strings.
//  */

// const convertDecimalToString = async (data: any): Promise<any> => {
//   if (data === null || data === undefined) {
//     return data;
//   }

//   if (data instanceof Decimal) {
//     return data.toString();
//   }

//   if (Array.isArray(data)) {
//     return data.map(convertDecimalToString);
//   }

//   // 👇 THE FIX IS HERE: This now correctly handles Prisma's model instances
//   if (typeof data === "object") {
//     return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, convertDecimalToString(value)]));
//   }

//   return data;
// };

// // Middleware to convert Decimal fields to strings after a query
// prisma.$use(async (params, next) => {
//   const result = await next(params);
//   return convertDecimalToString(result);
// });

export default prisma;
