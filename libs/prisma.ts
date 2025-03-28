import { PrismaClient } from "@prisma/client";

// TESTING: test Prisma Client Connection
// TESTING: nc -zv aws-0-eu-west-1.pooler.supabase.com 6543

// OLD________________START ::
// const prisma = new PrismaClient({
//   log: ["query", "info", "warn", "error"], // Enable all log levels
// });
// export default prisma;
// OLD________________END ::

// INFO: Ensure Single Prisma Client Instance
// INFO: Don’t create a new PrismaClient in every API request.
// INFO: Use a singleton pattern:
// INFO: TO AVOID THIS ERROR (TOO MANY CONNECTIONS:
// INFO: prisma:info Starting a postgresql pool with 21 connections.

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

export default prisma;
