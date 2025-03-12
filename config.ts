import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // Name of the application used for branding and SEO
  appName: "Recipee",
  // Brief description of the application for SEO purposes; can be customized
  appDescription: "Recipee - Easy Recipe, Production, Nutrition and Everything Food Related. For Chefs. With Recipe Version History, Chef Feeback Task Management",
  // Domain name of the application without protocol or trailing slash
  domainName: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "http://recipee.app",
  crisp: {
    // Crisp support widget ID; leave empty if Crisp is not used
    id: "",
    // Define which routes should show the Crisp chat widget; set to ["/"] to show only on the homepage
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Define your Stripe pricing plans with unique price IDs
    plans: [
      {
        // Price ID for the development environment; change for production
        priceId: process.env.NODE_ENV === "development" ? "price_1Niyy5AxyNprDp7iZIqEyD2h" : "price_1Niyy5AxyNprDp7iZIqEyD2h",
        // Name of the pricing plan shown to users
        name: "Starter",
        // Description of the plan; helpful for users to understand plan benefits
        description: "Ideal for small projects and startups",
        // Discount price
        price: 99,
        // Original price
        priceAnchor: 149,
        features: [{ name: "NextJS boilerplate" }, { name: "User OAuth integration" }, { name: "Database setup" }, { name: "Email functionality" }],
      },
      {
        priceId: process.env.NODE_ENV === "development" ? "price_1O5KtcAxyNprDp7iftKnrrpw" : "price_1O5KtcAxyNprDp7iftKnrrpw",
        // Mark this plan as featured to highlight it on the pricing page
        isFeatured: true,
        name: "Advanced",
        description: "For those who need additional features and support",
        price: 149,
        priceAnchor: 299,
        features: [
          { name: "NextJS boilerplate" },
          { name: "User OAuth integration" },
          { name: "Database setup" },
          { name: "Email functionality" },
          { name: "1 year of updates" },
          { name: "24/7 support" },
        ],
      },
    ],
  },
  aws: {
    // AWS S3/CloudFront configuration for asset storage (if using)
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // Subdomain for sending emails; remove if not using a subdomain
    subdomain: "mg",
    // Required email 'From' field for sending magic login links
    fromNoReply: process.env.SEND_EMAIL_FROM,
    // Required email 'From' field for other types of emails like updates
    fromAdmin: `Wayne <wayne@thinkshift-ai.com>`,
    // Support email shown to customers; leave empty if not needed
    supportEmail: "wayne@thinkshift-ai.com",
    // Forward replies from the support email to another address
    forwardRepliesTo: "wayne@thinkshift-ai.com",
  },
  colors: {
    // DaisyUI theme name to apply; defaults to dark theme
    theme: "light",
    // Main color used throughout the application, including the loading bar and browser tabs
    main: themes["light"]["primary"],
  },
  // auth: {
  //   // Path for user login; used to protect private routes
  //   // loginUrl: "/api/auth/signin",
  //   // Redirect URL after successful login; usually a private user dashboard
  //   // callbackUrl: "/dashboard",
  // },
} as ConfigProps;

export default config;
