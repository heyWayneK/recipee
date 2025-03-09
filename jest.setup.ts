import "@testing-library/jest-dom"; // Adds DOM-specific matchers like toBeInTheDocument
// INFO: This adds RTL’s custom matchers (like toBeInTheDocument) to Jest.

// INFO: Polyfill window.matchMedia (if using Cypress or RTL)
// If you’re seeing errors about matchMedia (common with RTL or Cypress), add this to jest.setup.ts:

// global.matchMedia =
//   global.matchMedia ||
//   function () {
//     return {
//       matches: false,
//       addListener: jest.fn(),
//       removeListener: jest.fn(),
//     };
//   };
