import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import config from "@/config";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

interface NextAuthOptionsExtended extends NextAuthOptions {
  adapter: any;
}

async function sendVerificationRequest(params: any) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  const resend = new Resend(process.env.RESEND_API_KEY);

  const sendEmail = await resend.emails.send({
    from: process.env.SEND_EMAIL_FROM!,
    subject: "Login To Recipee",
    to: identifier,
    html: `<h1>hello, ${url}, ${identifier}, ${provider}, ${theme}, ${host} </h1>`,
  });
  console.log("sendEmail", sendEmail);
}
export const authOptions: NextAuthOptionsExtended = {
  // Set any random key in .env.local
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      // Follow the "Login with Google" tutorial to get your credentials
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name ? profile.given_name : profile.name,
          email: profile.email,
          image: profile.picture,
          createdAt: new Date(),
        };
      },
    }),
    // Follow the "Login with Email" tutorial to configure your email server.
    // Ensure you have a PostgreSQL database set up by defining the `POSTGRESQL_URI` environment variable.
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.NODEMAILER_SEND_EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  // New users will be stored in a PostgreSQL database. Each user record (model) will include fields such as name, email, image, and more.
  // A PostgreSQL database is required; make sure to set the POSTGRESQL_URI environment variable.
  // For more information on the model structure, visit: https://next-auth.js.org/v3/adapters/models
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, token }) => {
      // if (session !== undefined) {
      //   session.user.id = token.sub;
      // }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    brandColor: config.colors.main,
    // Add your custom logo below. The recommended size is rectangular (e.g., 200x50px) to display both your logo and name.
    // This logo will appear during the login process. If not provided, a placeholder or faded look will be applied.
    // logo: `https://${config.domainName}/logoAndName.png`,
    logo: `${config.domainName}/logoAndName.png`,
  },
};

export default NextAuth(authOptions);
