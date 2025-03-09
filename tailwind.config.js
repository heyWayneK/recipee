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
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        secondary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
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
          primary: "#0f172a",
          "primary-content": "#ff0000",
          secondary: "#334155",
          "secondary-content": "#334155",
          accent: "#00ffff",
          neutral: "#94a3b8",
          "base-100": "#F5F5F5",
          "text-base-content": "#ff0000",
          info: "#0000ff",
          success: "#00ff00",
          warning: "#ff7f00",
          "warning-content": "#ff7f00",
          error: "#ff0000",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#ff00ff",
          "primary-content": "#f1f5f9",
          secondary: "#ff00ff",
          "secondary-content": "#ff00ff",
          accent: "#00ffff",
          neutral: "#94a3b8",
          "base-100": "#334155",
          "text-base-content": "#f1f5f9",
          info: "#0000ff",
          success: "#00ff00",
          warning: "#ff7f00",
          "warning-content": "#ff7f00",
          error: "#ff0000",
        },
      },
    ],
  },
};
