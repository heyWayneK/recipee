import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  })),
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

jest.mock("@clerk/nextjs", () => ({
  ClerkProvider: ({ children }) => <>{children}</>,
  useAuth: () => ({
    isSignedIn: true,
    userId: "user_2fBORKfV2ExRz94O955hUfA4aCR",
  }),
}));

jest.mock('@/libs/superjson', () => ({
  superjson: {
    parse: (str) => JSON.parse(str),
    stringify: (obj) => JSON.stringify(obj),
    registerCustom: jest.fn(),
  }
}));
