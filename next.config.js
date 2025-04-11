/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  reactStrictMode: false,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      "recipee.app",
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
      "localhost",
      "cdn-icons-png.flaticon.com",
      "res.cloudinary.com",
      "fast-strapi-cms-651b34b82e95.herokuapp.comhttps",
    ],
  },

  //INFO:  IMPORTANT FOR JEST TESTING.
  // to allow live to use SWC
  experimental: {
    // forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
