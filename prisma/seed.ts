import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const customerData = [
  {
    id: 2,
    name: "person 2",
    email: "",
    emailVerified: null,
    address: "",
    logo: null,
    active: true,
    paymentOptions: "",
    contacts: "",
    createdAt: "2025-03-08T17:37:51.807Z",
    updatedAt: "2025-03-08T17:37:37.359Z",
  },
  {
    id: 1,
    name: "wayne",
    email: "wayne@recipee.app2",
    emailVerified: null,
    address: "",
    logo: null,
    active: true,
    paymentOptions: "",
    contacts: "",
    createdAt: "2025-03-08T17:37:33.386Z",
    updatedAt: "2025-03-08T17:37:10.263Z",
  },
  // Add more records from your exported data
];

async function customerInsert() {
  console.log("Start seeding...");
  await prisma.customer.deleteMany(); // Optional: Clear existing data (use with caution)
  await prisma.customer.createMany({
    data: customerData,
    skipDuplicates: true, // Prevents errors if data already exists
  });
  console.log("Seeding finished.");
}

customerInsert()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// OTHER SEEDED DATA____________________START:
// OTHER SEEDED DATA____________________START:
// OTHER SEEDED DATA____________________START:

// customer  - http://localhost:3000/api/get-seed/customer
/**
 {
    "id": 2,
    "name": "person 2",
    "email": "",
    "emailVerified": null,
    "address": "",
    "logo": null,
    "active": true,
    "paymentOptions": "",
    "contacts": "",
    "createdAt": "2025-03-08T17:37:51.807Z",
    "updatedAt": "2025-03-08T17:37:37.359Z"
  },
  {
    "id": 1,
    "name": "wayne",
    "email": "wayne@recipee.app2",
    "emailVerified": null,
    "address": "",
    "logo": null,
    "active": true,
    "paymentOptions": "",
    "contacts": "",
    "createdAt": "2025-03-08T17:37:33.386Z",
    "updatedAt": "2025-03-08T17:37:10.263Z"
  }



 */

// CookedYieldsCategories - http://localhost:3000/api/get-seed/CookedYieldsCategories
/**
 [
  {
    "id": 1,
    "name": "Roasting & Baking",
    "translation": null,
    "desc": "Hot Air Cooking",
    "yield": 0.7,
    "isLive": true,
    "updatedAt": "2025-03-11T12:24:18.000Z"
  },
  {
    "id": 2,
    "name": "Grilling & Broiling",
    "translation": null,
    "desc": "Direct High Heat",
    "yield": 0.75,
    "isLive": true,
    "updatedAt": "2025-03-11T12:25:06.000Z"
  },
  {
    "id": 3,
    "name": "Frying",
    "translation": null,
    "desc": "Oil as a Heat Medium",
    "yield": 0.7,
    "isLive": true,
    "updatedAt": "2025-03-11T12:25:39.000Z"
  },
  {
    "id": 4,
    "name": "Sautéing & Stir-Frying",
    "translation": null,
    "desc": "Fast, High Heat",
    "yield": 0.8,
    "isLive": true,
    "updatedAt": "2025-03-11T12:26:45.000Z"
  },
  {
    "id": 6,
    "name": "Boiling & Simmering",
    "translation": null,
    "desc": "Direct Water Cooking",
    "yield": 0.85,
    "isLive": true,
    "updatedAt": "2025-03-11T15:27:38.000Z"
  },
  {
    "id": 7,
    "name": "Steaming",
    "translation": null,
    "desc": "Using Steam to Cook.",
    "yield": 0.9,
    "isLive": true,
    "updatedAt": "2025-03-11T15:29:25.000Z"
  },
  {
    "id": 8,
    "name": "Combination Cooking",
    "translation": null,
    "desc": "Dry + Moist Heat",
    "yield": 0.72,
    "isLive": true,
    "updatedAt": "2025-03-11T15:32:21.000Z"
  },
  {
    "id": 10,
    "name": "Sous Vide",
    "translation": null,
    "desc": "Sealed, Slow Sous Vide Cooking",
    "yield": 0.9,
    "isLive": true,
    "updatedAt": "2025-03-11T16:11:58.000Z"
  }
]




 */
// dryCookedYields - http://localhost:3000/api/get-seed/dryCookedYields
/**
 [
  {
    "id": 1,
    "name": "Short Pasta (Penne, Fusilli, Macaroni)",
    "translation": null,
    "desc": "Short White Pasta (Penne, Fusilli, Macaroni)",
    "yield": 2.4,
    "isLive": true,
    "updatedAt": "2025-03-11T18:05:14.000Z",
    "DryCookedYieldsCategoriesId": 1
  },
  {
    "id": 2,
    "name": "Long pasta (spaghetti, fettuccine)",
    "translation": null,
    "desc": "Long White asta (spaghetti, fettuccine)",
    "yield": 2.25,
    "isLive": true,
    "updatedAt": "2025-03-11T18:07:48.000Z",
    "DryCookedYieldsCategoriesId": 1
  },
  {
    "id": 3,
    "name": "Whole Wheat Pasta",
    "translation": null,
    "desc": "Whole Wheat Dry Pasta",
    "yield": 2,
    "isLive": true,
    "updatedAt": "2025-03-11T18:15:12.000Z",
    "DryCookedYieldsCategoriesId": 1
  },
  {
    "id": 4,
    "name": "Fresh Pasta (Egg Based)",
    "translation": null,
    "desc": "Egg-based pasta (tagliatelle, fettuccine, ravioli)",
    "yield": 1.4,
    "isLive": true,
    "updatedAt": "2025-03-11T18:17:57.000Z",
    "DryCookedYieldsCategoriesId": 1
  },
  {
    "id": 5,
    "name": "Fresh Semolina Pasta",
    "translation": null,
    "desc": "Fresh Semolina pasta (gnocchi, orecchiette, trofie)",
    "yield": 1.45,
    "isLive": true,
    "updatedAt": "2025-03-11T18:22:42.000Z",
    "DryCookedYieldsCategoriesId": 1
  },
  {
    "id": 6,
    "name": "White Rice",
    "translation": null,
    "desc": "White Rice General",
    "yield": 3,
    "isLive": true,
    "updatedAt": "2025-03-11T20:51:46.000Z",
    "DryCookedYieldsCategoriesId": 3
  },
  {
    "id": 7,
    "name": "Brown Rice",
    "translation": null,
    "desc": "Brown Rice General",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T20:52:48.000Z",
    "DryCookedYieldsCategoriesId": 3
  },
  {
    "id": 8,
    "name": "Wild Rice",
    "translation": null,
    "desc": "Wild Rice",
    "yield": 3.5,
    "isLive": true,
    "updatedAt": "2025-03-11T20:54:13.000Z",
    "DryCookedYieldsCategoriesId": 3
  },
  {
    "id": 10,
    "name": "Bulgur Wheat",
    "translation": null,
    "desc": "Bulgur Wheat Raw",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T20:58:14.000Z",
    "DryCookedYieldsCategoriesId": 5
  },
  {
    "id": 12,
    "name": "Couscous",
    "translation": null,
    "desc": "Couscous Raw",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T21:01:28.000Z",
    "DryCookedYieldsCategoriesId": 6
  },
  {
    "id": 9,
    "name": "Quinoa",
    "translation": null,
    "desc": "Quinoa Raw",
    "yield": 3,
    "isLive": true,
    "updatedAt": "2025-03-11T20:55:41.000Z",
    "DryCookedYieldsCategoriesId": 5
  },
  {
    "id": 13,
    "name": "Farro Grain",
    "translation": null,
    "desc": "Farro Grain Raw",
    "yield": 2.7,
    "isLive": true,
    "updatedAt": "2025-03-11T21:28:17.000Z",
    "DryCookedYieldsCategoriesId": 7
  },
  {
    "id": 14,
    "name": "Gnocchi",
    "translation": null,
    "desc": "Fresh Gnocchi Dumpling Pasta",
    "yield": 1.2,
    "isLive": true,
    "updatedAt": "2025-03-11T22:39:46.000Z",
    "DryCookedYieldsCategoriesId": 1
  },
  {
    "id": 15,
    "name": "Oats (rolled)",
    "translation": null,
    "desc": "Oats (rolled)",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T22:43:55.000Z",
    "DryCookedYieldsCategoriesId": 5
  },
  {
    "id": 16,
    "name": "Oats (steel-cut)",
    "translation": null,
    "desc": "Oats (steel-cut)",
    "yield": 2.7,
    "isLive": true,
    "updatedAt": "2025-03-11T22:44:59.000Z",
    "DryCookedYieldsCategoriesId": 5
  },
  {
    "id": 18,
    "name": "Couscous",
    "translation": null,
    "desc": "Couscous - Semolina Flour from Durum Wheat. 3 Sizes Small Moroccan, Medium Israeli Pear Couscous, Large Lebanese",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T22:54:49.000Z",
    "DryCookedYieldsCategoriesId": 1
  }
]




 */
// DryCookedYieldsCategories - http://localhost:3000/api/get-seed/DryCookedYieldsCategories
/**
 [
  {
    "id": 1,
    "name": "Pasta",
    "translation": null,
    "desc": "General Dry  or Fresh Pasta Cooking",
    "yield": 2,
    "isLive": true,
    "updatedAt": "2025-03-11T17:42:07.000Z"
  },
  {
    "id": 3,
    "name": "Rice",
    "translation": null,
    "desc": "White Rice (long/short grain)",
    "yield": 3,
    "isLive": true,
    "updatedAt": "2025-03-11T19:31:21.000Z"
  },
  {
    "id": 8,
    "name": "Barley (pearled)",
    "translation": null,
    "desc": "Barley (pearled)",
    "yield": 3.5,
    "isLive": true,
    "updatedAt": "2025-03-11T19:34:10.000Z"
  },
  {
    "id": 9,
    "name": "Farro Grain",
    "translation": null,
    "desc": "Farro",
    "yield": 2.7,
    "isLive": true,
    "updatedAt": "2025-03-11T19:34:42.000Z"
  },
  {
    "id": 10,
    "name": "Oats",
    "translation": null,
    "desc": "Oats Raw",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T20:34:48.000Z"
  },
  {
    "id": 11,
    "name": "Egg Noodles",
    "translation": null,
    "desc": "Egg Noodles Raw",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T20:35:48.000Z"
  },
  {
    "id": 13,
    "name": "Rice Noodles",
    "translation": null,
    "desc": "Rice Noodles Dried",
    "yield": 2,
    "isLive": true,
    "updatedAt": "2025-03-11T20:36:50.000Z"
  },
  {
    "id": 14,
    "name": "Lentils",
    "translation": null,
    "desc": "Lentils Dried",
    "yield": 2,
    "isLive": true,
    "updatedAt": "2025-03-11T20:38:48.000Z"
  },
  {
    "id": 15,
    "name": "Beans",
    "translation": null,
    "desc": "Dried Beans",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T20:40:08.000Z"
  },
  {
    "id": 16,
    "name": "Polenta",
    "translation": null,
    "desc": "Polenta Dried",
    "yield": 4,
    "isLive": true,
    "updatedAt": "2025-03-11T20:41:58.000Z"
  },
  {
    "id": 18,
    "name": "Chickpeas",
    "translation": null,
    "desc": "Chickpeas Raw",
    "yield": 2.7,
    "isLive": true,
    "updatedAt": "2025-03-11T20:43:48.000Z"
  },
  {
    "id": 5,
    "name": "Cereals, Pseudocereals",
    "translation": null,
    "desc": "Cereals, Pseudocereals",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T19:32:42.000Z"
  },
  {
    "id": 7,
    "name": "Grains",
    "translation": null,
    "desc": "Grains e.g., Bulgar Wheat",
    "yield": 2.7,
    "isLive": true,
    "updatedAt": "2025-03-11T19:33:42.000Z"
  },
  {
    "id": 4,
    "name": "----",
    "translation": null,
    "desc": "Quinoa Seeds",
    "yield": 3,
    "isLive": true,
    "updatedAt": "2025-03-11T19:31:49.000Z"
  },
  {
    "id": 6,
    "name": "--",
    "translation": null,
    "desc": "Couscous",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T19:33:07.000Z"
  },
  {
    "id": 17,
    "name": "Semolina-- ? Flours",
    "translation": null,
    "desc": "Semolina Dried",
    "yield": 2.5,
    "isLive": true,
    "updatedAt": "2025-03-11T20:42:50.000Z"
  }
]




 */
