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
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client with singleton pattern and jsonProtocol
const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : [],
    datasources: {
      db: {
        url: "postgresql://postgres.zozztsfhpsotmekjeiwt:U9c3eWo6bExDoVKd@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
      },
    },
  });

// Cache the Prisma instance in development
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// WAYNES OLDER VERSION

// // Extend the Node.js Global interface to include prsisma
// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

// // Initialize prisma as a PrismaClient type
// let prisma: PrismaClient;

// // Singleton pattern for PrismaClient to avoid multiple connections
// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient({
//     // log: ["query", "info", "warn", "error"], // Enable all log levels
//     datasources: {
//       db: {
//         // url: process.env.DATABASE_URL,
//         url: "postgresql://postgres.zozztsfhpsotmekjeiwt:U9c3eWo6bExDoVKd@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
//       },
//     },
//   });
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient({
//       log: ["query", "info", "warn", "error"], // Enable all log levels
//       datasources: {
//         db: {
//           // url: process.env.DATABASE_URL,
//           url: "postgresql://postgres.zozztsfhpsotmekjeiwt:U9c3eWo6bExDoVKd@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
//         },
//       },
//     });
//   }
//   prisma = global.prisma;
// }

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
