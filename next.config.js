/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  reactStrictMode: true,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
      "localhost",
      "cdn-icons-png.flaticon.com",
      "res.cloudinary.com",
      "fast-strapi-cms-651b34b82e95.herokuapp.comhttps",
      "recipee.app",
    ],
  },
};

module.exports = nextConfig;
