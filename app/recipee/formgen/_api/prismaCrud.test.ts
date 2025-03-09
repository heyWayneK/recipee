// prismaCrud.test.ts
import { PrismaClient } from "@prisma/client";
import { getAll, modelMap, TableName } from "./prismaCrud";

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    customer: {
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe("getAll", () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma = new PrismaClient();
  });

  it("should return more than 0 rows from the customers table", async () => {
    const mockData = [{ id: 1, name: "John Doe" }];
    prisma.customer.findMany.mockResolvedValue(mockData);

    const result = await getAll("customers" as TableName);
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(prisma.customer.findMany).toHaveBeenCalledTimes(1);
  });
});
