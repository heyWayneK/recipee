# Recipee — Typescript

## isOnline()?

- using hook:
  ```javascript
  const { isOnline } = UseOnlineStatus();
  ```
- using component:
  ```javascript
  import { UseOnlineStatus } from "@/contexts/useOnlineStatus";
  <OnlineOffline />;
  ```

Hey Indie Hacker 👋 it's Dennis from [MicroSassFast](https://docs.microsaasfast.me/). Let's build your SaaS fast and NOW!

<sub>**Watch/Star the repo to be notified when updates are pushed**</sub>

## Get Started

1. Follow the [Get Started Tutorial](https://docs.microsaasfast.me/) to clone the repo and run your local server 💻

2. Follow the [Run your SaaS In 5 Minutes Tutorial](https://docs.microsaasfast.me/microsaas-in-5-minutes/) to learn the boilerplate and launch your micro SaaS today!

## Links

- [📚 Documentation](https://docs.microsaasfast.me/)
- [🧑‍💻 Discord](https://discord.gg/U75p2BQuAH)
- [🧑‍💻 Free clients guide](https://www.notion.so/Product-Hunt-Launch-36a5b9610bf04559b8fcf4a2a7b90ea6?pvs=4)

## Support

Reach out to me on [Twitter](https://twitter.com/DennisBabych) or hello@db2.io

# recipee

## Clerk - Auth Integration

```javascript
<>
  <Protect condition={(has) => has({ role: "org:admin" }) || has({ role: "org:billing_manager" })} fallback={<p>Only an Admin or Billing Manager can access this content.</p>}>
    {props.children}
  </Protect>
  <div> Unprotected content</div>
  <SignedOut>
    <SignInButton />
    <SignUpButton>
      <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">Sign Up</button>
    </SignUpButton>
  </SignedOut>
  <SignedIn>
    <UserButton />
  </SignedIn>
</>
```

## DECIMAL DATA TYPES
- Best Practice
When working with **Prisma**, **Supabase**, and `Decimal` type data in your app, you need to carefully handle precision and compatibility between the database, Prisma, and your application logic. Here's the best way to deal with it:

---

### **Plan**
1. **Database Schema**:
   - Ensure your database schema uses a `NUMERIC` or `DECIMAL` type for fields requiring high precision (e.g., prices, weights, etc.).
   - Supabase (PostgreSQL) supports `NUMERIC`/`DECIMAL` types natively.

2. **Prisma Schema**:
   - Use Prisma's `Decimal` type for fields that map to `NUMERIC`/`DECIMAL` in the database.
   - Prisma uses the `Decimal.js` library under the hood to handle high-precision arithmetic.

3. **Install Decimal.js**:
   - Install the `decimal.js` library in your app to work with `Decimal` values in your business logic.

4. **Transform Data**:
   - When fetching data from Prisma, ensure you handle `Decimal` objects correctly (e.g., convert to strings or numbers as needed).
   - When sending data to Supabase (if applicable), serialize `Decimal` values properly.

5. **Validation**:
   - Validate user input to ensure it conforms to the expected precision and scale before saving to the database.

---

### **Implementation**

#### 1. Prisma Schema Example
```prisma
model Product {
  id        Int     @id @default(autoincrement())
  name      String
  price     Decimal @db.Decimal(10, 2) // Precision: 10, Scale: 2
  createdAt DateTime @default(now())
}
```

#### 2. Install Decimal.js
```bash
npm install decimal.js
```

#### 3. Handling Decimal in TypeScript
```ts
import { Decimal } from 'decimal.js';

// Example: Fetching data from Prisma
const product = await prisma.product.findUnique({ where: { id: 1 } });
console.log(product.price.toString()); // Convert Decimal to string for display

// Example: Arithmetic with Decimal.js
const price = new Decimal(product.price);
const discountedPrice = price.mul(0.9); // Apply a 10% discount
console.log(discountedPrice.toFixed(2)); // Output as a string with 2 decimal places

// Example: Sending data to Supabase
const supabaseData = {
  ...product,
  price: product.price.toString(), // Convert Decimal to string for Supabase
};
await supabase.from('products').insert(supabaseData);
```

#### 4. Supabase Table Schema
In Supabase, define the `price` column as `NUMERIC(10, 2)` to match Prisma's schema:
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 5. Validation Example
```ts
function validatePrice(input: string): Decimal {
  const price = new Decimal(input);
  if (price.isNegative()) {
    throw new Error('Price cannot be negative');
  }
  return price;
}
```

---

### **Best Practices**
1. **Use Decimal.js for All Arithmetic**:
   - Avoid floating-point arithmetic with `number` in JavaScript. Always use `Decimal` for calculations involving money or precision.

2. **Serialize Decimal Properly**:
   - Convert `Decimal` to `string` when sending data to external APIs (e.g., Supabase).

3. **Database Consistency**:
   - Ensure the precision and scale in your Prisma schema match the database schema.

4. **Testing**:
   - Write tests to ensure your app handles `Decimal` values correctly, especially during serialization/deserialization.

---

By following these steps, you can seamlessly handle `Decimal` type data in your app with Prisma and Supabase.
- Using the Supabase Numeric/Decimal Type
```typescript
import { Decimal } from 'decimal.js';

// Example: Fetching data from Prisma
const product = await prisma.product.findUnique({ where: { id: 1 } });
console.log(product.price.toString()); // Convert Decimal to string for display

// Example: Arithmetic with Decimal.js
const price = new Decimal(product.price);
const discountedPrice = price.mul(0.9); // Apply a 10% discount
console.log(discountedPrice.toFixed(2)); // Output as a string with 2 decimal places

// Example: Sending data to Supabase
const supabaseData = {
  ...product,
  price: product.price.toString(), // Convert Decimal to string for Supabase
};
await supabase.from('products').insert(supabaseData);
```


## DATA (loaded on app opening)

### System /api/system/route.ts

- System data is User Id 1... this load default data for ingredients, allergies etc
  -- NB : const customerId = 1; // Default customer ID

## DARK LIGHT MODE

## CSS

### daisyUi Light and Dark Theme

- use hook to get "dark" or "light"
  const [isDarkOrLight] = useGetActiveTheme();

Button: <ButtonThemeLightDark />

```text
        BG: base-100
        TEXT: base-content

        base-200
        base-300

         primary
         primary-content

         secondary
         secondary-content

         accent

         neutral

         info  // blue
         success  // green
         warning // yellow
         error // red
```

### TAILWIND - cva() and twMerge()

- Its important to merge multiple tailwind scripts together propertly using BOTH cva and twMerge()

#### USING CVA + twMerge

````typescript
/ 1. Variant-based styling with cva (class-variance-authority)
const pillVariants = cva("relative flex h-full min-w-10 cursor-pointer select-none items-center gap-x-1 rounded-full border border-slate-500 px-3 py-1 text-nowrap transition-colors", {
  variants: {
    tone: {
      clear: "text-black",
      white: "bg-white text-black",
      dark: "bg-black text-white",
    },
    edit: {
      edit: "[&>div]:before:text-red-500 ",
      save: "[&>div]:before:text-green-600 ",
      options: "[&>div]:before:text-blue-500",
    },
  },
  defaultVariants: {
    tone: "clear",
    edit: "edit", // Set default for edit state
  },
});

// 2. Clear and self-documenting prop types
export interface PillProps
  // ComponentProps includes standard HTML div props e.g onClick
  extends ComponentProps<"div">,
    VariantProps<typeof pillVariants> {
  iconName?: allowedIcon;
  iconPosition?: "left" | "right";
  edit?: "edit" | "save" | "options" | ""; // Optional edit state
}

// 3. Main component with clean and readable JSX
const Pill: React.FC<PillProps> = ({ className, children, tone, edit = "", iconName, iconPosition = "left", ...props }) => {
  // ...
}```

```typescript
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// 1. Variant-based styling with cva (class-variance-authority)
const pillVariants = cva("relative flex h-full min-w-10 cursor-pointer select-none items-center gap-x-1 rounded-full border border-slate-500 px-3 py-1 text-nowrap transition-colors", {
  variants: {
    tone: {
      clear: "text-black",
      white: "bg-white text-black",
      dark: "bg-black text-white",
    },
    // edit: {
    //   edit: "[&>div]:before:text-red-500 ",
    //   save: "[&>div]:before:text-green-600 ",
    //   options: "[&>div]:before:text-blue-500",
    // },
  },
  defaultVariants: {
    tone: "clear",
    // edit: "edit", // Set default for edit state
  },
});

** twMerge() **
On the return() for the page function
e.g. return (
    <div className={twMerge(pillVariants({ tone }), className || "")} {...props}>
      {iconPosition === "left" && renderMainIcon()}
      {children}
      {iconPosition === "right" && renderMainIcon()}
      {renderEditIcon()}
    </div>
````

### Translate text

There are 2 steps:

1. use function: getTextTranslation("myText")
   import {getTextTranslation } from "@/libs/utils";
2. update translations in /data/lang.ts

### Working with Weights and Units

Use the function to convert weights.
The system works in metric ALWAYS.

- formatWeight(your_weight)

### Component Key Name Cleaning

Cleans the "key" so we dont have special character or spaces
(I use customer text for recipe names)
use cleanComponentKeyName(keyName)

# EXAMPLE ON MARKDOWN

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

# OLD - CAN DELETE AFTER THIS LATER

# TEST FORMATTING - DELETE**\_\_\_\_**START:

- Item 1
- Item 2
  - Subitem 1
  - Subitem 2
- Item 3

1. First item
2. Second item
3. Third item

_Italics_ or _Italics_
**Bold** or **Bold**
**_Bold and Italics_** or **_Bold and Italics_**

`code markdown`

**Troubleshooting:**

- **Problem:** "npm install" fails with an error.
  **Solution:** Make sure you have the correct version of Node.js and npm installed. Try clearing your npm cache: `npm cache clean --force` and then try `npm install` again.

**Further Reading:**

- [test](https://link)
- [test](https://link)

```javascript
// Code block with language specified (e.g., javascript, python, java)
function myFunction() {
  return "Hello, world!";
}
```

> This is a blockquote.
>
> > This is a nested blockquote.

| Header 1      | Header 2      | Header 3      |
| ------------- | ------------- | ------------- |
| Row 1, Cell 1 | Row 1, Cell 2 | Row 1, Cell 3 |
| Row 2, Cell 1 | Row 2, Cell 2 | Row 2, Cell 3 |

## Links

- [📚 Documentation](https://docs.microsaasfast.me/)
- [🧑‍💻 Discord](https://discord.gg/U75p2BQuAH)
- [🧑‍💻 Free clients guide](https://www.notion.so/Product-Hunt-Launch-36a5b9610bf04559b8fcf4a2a7b90ea6?pvs=4)
