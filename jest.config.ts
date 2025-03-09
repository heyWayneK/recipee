module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // Dont run as "node"
  // testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    // "^@/(.*)$": "<rootDir>/src/$1",
    // Handle CSS imports (common in Next.js)
    // "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};

//____________________

// import type {Config} from 'jest';

// const config: Config = {
//   verbose: true,
// };

// export default config;

//____________________

// import nextJest from "next/jest";

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files
//   dir: "./",
// });

// // Add any custom config to be passed to Jest
// const customJestConfig = {
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
//   testEnvironment: "jest-environment-jsdom",
//   moduleNameMapper: {
//     // Handle module aliases (if you use them in your project)
//     "^@/components/(.*)$": "<rootDir>/components/$1",
//     "^@/pages/(.*)$": "<rootDir>/pages/$1",
//   },
// };

// ____________________

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config
// export default createJestConfig(customJestConfig);

// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
//   moduleNameMapper: {
//     // Handle CSS and asset imports
//     "^.+\\.(css|less|scss)$": "identity-obj-proxy",
//     "^.+\\.(jpg|jpeg|png|gif|svg)$": "jest-transform-stub",
//     // Map TypeScript path aliases (adjust based on your tsconfig.json)
//     "^@/contexts/(.*)$": "<rootDir>/contexts/$1",
//     "^@/components/(.*)$": "<rootDir>/components/$1", // Add more as needed
//     // Mock Next.js modules
//     "^next/image$": "<rootDir>/__mocks__/nextImage.js",
//     "^next/router$": "<rootDir>/__mocks__/nextRouter.js",
//   },
//   globals: {
//     "ts-jest": {
//       tsconfig: "<rootDir>/tsconfig.json",
//     },
//   },
//   // Optional: Handle ES modules if needed
//   transformIgnorePatterns: ["/node_modules/(?!your-esm-module/)"],
//   // Optional: Enable code coverage
//   collectCoverage: true,
//   collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
//   coverageReporters: ["text", "lcov"],
// };
