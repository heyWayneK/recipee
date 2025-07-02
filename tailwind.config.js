const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./styles/globals.css", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      // gridTemplateColumns: {
      //   // USED TO PREGENERATE RECIPE ASSEMBLY ROWS
      //   // Add as many as you need
      //   1: "[2fr_repeat(1,1fr)]",
      //   2: "[2fr_repeat(2,1fr)]",
      //   3: "[2fr_repeat(3,1fr)]",
      //   4: "[2fr_repeat(4,1fr)]",
      //   5: "[2fr_repeat(5,1fr)]",
      //   6: "[2fr_repeat(6,1fr)]",
      //   7: "[2fr_repeat(7,1fr)]",
      //   8: "[2fr_repeat(8,1fr)]",
      //   9: "[2fr_repeat(9,1fr)]",
      //   10: "[2fr_repeat(10,1fr)]",
      // },
      // safelist: [
      //   // gridTemplateColumns:
      //   // To ensure Tailwind preserves dynamically generated classes
      //   {
      //     pattern: /grid-cols-./,
      //   },
      // ],
      colors: {
        primary: {
          50: "#f1f5f9",
          100: "#e2e8f0",
          200: "#cbd5e1",
          300: "#94a3b8",
          400: "#64748b",
          500: "#475569",
          600: "#334155",
          700: "#1e293b",
          800: "#0f172a",
          900: "#0f172a",
        },
        secondary: {
          50: "#fce8e0",
          100: "#f9c6b5",
          200: "#f7a28a",
          300: "#f57e5e",
          400: "#f37055", // Updated color
          500: "#f37055", // Same as above
          600: "#d95b4c",
          700: "#b44a3d",
          800: "#8f3a2e",
          900: "#6b2b20",
        },
        neutral: colors.gray,
        // Add more color ranges as needed
        recipe: {
          r0: "#9d174d",
          r1: "#BE7028",
          r2: "#1E929C",
          r3: "#831E9C",
          r4: "#BE9E28",
          r5: "#96B323",
          r6: "#501E9C",
          r7: "#E07272",
          r8: "#1E9C42",
          r9: "#9C1E8B",
          r10: "#1E789C",
          r11: "#C04624",
          r12: "#1E249C",
          r13: "#9C1E42",
          r14: "#7EA017",
          r15: "#E09E72",
          r16: "#1E4C9C",
          r17: "#E0C872",
          r18: "#A5E072",
          r19: "#72E0CA",
          r20: "#7BA4F0",
          r21: "#8F72E0",
          r22: "#C672E0",
          r23: "#BE2828",
          r24: "#929292",
          r25: "#595959",
        },
      },
      boxShadow: {
        shadow1: "0 0 4px 4px rgb(0 0 0 / 0.2)",
      },
      backgroundImage: {
        gradientRainbow: "linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)",
        gradientGreyDarkerTop: "linear-gradient(30deg, rgba(160, 160, 160, 0.23) 23.96%, rgba(255, 255, 255, 0) 98.44%)",
        gradientGreyDarkerBott: "linear-gradient(30deg, rgba(160, 160, 160, 0.23) 23.96%, rgba(255, 255, 255, 0) 98.44%)",
        gradientGreyDarkerBott2: "linear-gradient(60deg, rgba(160, 160, 160, 0.23) 23.96%, rgba(255, 255, 255, 0) 98.44%)",
        launchSvg: "url('/launch/launch-bg.svg')",
      },
      // TODO: did this safelist work?
      // SAFETLIST forces the CSS to be written to the CSS file
      // There was an issue where most gradients werent available in CSS
      safelist: ["bg-gradientRainbow", "bg-gradientGreyDarkerTop", "bg-gradientGreyDarkerBott", "bg-gradientGreyDarkerBott2"],
      animation: {
        opacity: "opacity 0.25s ease-in-out",
        appearFromRight: "appearFromRight 300ms ease-in-out",
        wiggle: "wiggle 1.5s ease-in-out infinite",
        popup: "popup 0.25s ease-in-out",
        shimmer: "shimmer 3s ease-out infinite alternate",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        opacity: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        appearFromRight: {
          "0%": {
            opacity: 0.3,
            transform: "translate(15%, 0px);",
          },
          "100%": {
            opacity: 1,
            transform: "translate(0);",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wiggle: {
          "0%, 20%, 80%, 100%": {
            transform: "rotate(0deg)",
          },
          "30%, 60%": {
            transform: "rotate(-2deg)",
          },
          "40%, 70%": {
            transform: "rotate(2deg)",
          },
          "45%": {
            transform: "rotate(-4deg)",
          },
          "55%": {
            transform: "rotate(4deg)",
          },
        },
        popup: {
          "0%": {
            transform: "scale(0.8)",
            opacity: 0.8,
          },
          "50%": {
            transform: "scale(1.1)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "0 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    // Light & dark themes are added by default (it switches automatically based on OS settings)
    // You can add another theme among the list of 30+
    // Add "data-theme='theme_name" to any HTML tag to enable the 'theme_name' theme.
    // https://daisyui.com/
    // themes: ["light", "dark"],
    /* 
    slate-100 #f1f5f9
    slate-200 #e2e8f0
    slate-300 #cbd5e1
    slate-400 #94a3b8
    slate-500 #64748b
    slate-600 #475569
    slate-700 #334155
    slate-800 #1e293b
    slate-900 #0f172a

    */

    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],

          // Your color palette applied
          primary: "#0f172a", // A strong, dark blue-gray for main actions
          "primary-content": "#f1f5f9", // Light text for high contrast on primary buttons

          secondary: "#f37055", // Your vibrant secondary orange
          "secondary-content": "#ffffff", // White text is most readable on this orange

          accent: "#f57e5e", // A slightly lighter orange for emphasis

          neutral: "#94a3b8", // A mid-gray for neutral elements

          "base-100": "#FFFFFF", // Your specified light mode background
          "base-content": "#0f172a", // Dark text for high readability on the light background

          // Standard semantic colors for clarity
          info: "#60a5fa", // blue
          success: "#4ade80", // green
          warning: "#facc15", // yellow
          error: "#f87171", // red
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],

          // Your color palette applied
          primary: "#f1f5f9", // A light, soft gray for main actions in dark mode
          "primary-content": "#0f172a", // Dark text for high contrast on primary buttons

          secondary: "#f37055", // Your vibrant secondary orange pops against the dark bg
          "secondary-content": "#0f172a", // Dark text provides good contrast on the orange

          accent: "#f57e5e", // A slightly lighter orange for emphasis

          neutral: "#e2e8f0", // A subtle dark gray for neutral elements

          "base-100": "#1e293b", // Your specified dark mode background
          "base-content": "#e2e8f0", // Light text for high readability on the dark background

          // Brighter semantic colors for dark mode
          info: "#38bdf8",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#ef4444",
        },
      },
    ],
  },
};
