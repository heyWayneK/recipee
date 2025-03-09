name: Test and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run test # Jest unit tests
      - run: npm run build # Ensure Next.js build passes
      - run: npx cypress run # Cypress E2E tests
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
