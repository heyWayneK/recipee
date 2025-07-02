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

## DARK LIGHT MODE

## CSS

### daisyUi Light and Dark Theme

- use hook to get "dark" or "light"
  const [isDarkOrLight] = useGetActiveTheme();

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

#### USING CVS

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
