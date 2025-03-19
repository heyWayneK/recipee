import { PrismaClient } from "@prisma/client";

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

// Extend the Node.js Global interface to include prisma
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
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"], // Enable all log levels
    });
  }
  prisma = global.prisma;
}

export default prisma;
