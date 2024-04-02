// @/auth.ts

import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

type SignInHandlerType = (
  user: any,
  account: any,
  profile: any,
  email: any,
  credentials: any
) => Promise<boolean>;

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;            // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_HANDLERS: Record<string, SignInHandlerType> = {
  "credentials": async (user, account, profile, email, credentials) => {
    return true;
  },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      // The data returned from this function is passed forward as the
      // `user` variable to the signIn() and jwt() callback
      async authorize(credentials, req) {
        try {
          const response = await axios({
            url: process.env.NEXTAUTH_BACKEND_URL + "api/auth/login/",
            method: "post",
            data: credentials,
          });
          const data = response.data;
          if (data) return data;
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
      return SIGN_IN_HANDLERS[account.provider](
        user, account, profile, email, credentials
      );
    },
    async jwt({ user, token, account, trigger, session }: any) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        let backendResponse: Session = account.provider === "credentials" ? user : account.meta;
        token["access"] = backendResponse.access; // access token
        token["refresh"] = backendResponse.refresh; // refresh token
        token["user"] = backendResponse.user;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token; // user session data
      }
      // Refresh the backend token if necessary
      if (getCurrentEpochTime() > token["ref"]) {
        const response = await axios({
          method: "post",
          url: process.env.NEXTAUTH_BACKEND_URL + "api/auth/token/refresh/",
          data: {
            refresh: token["refresh"], // refresh token
          },
        });
        token["access"] = response.data.access;
        token["refresh"] = response.data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      return token;
    },
    // Since we're using Django as the backend we have to pass the JWT
    // token to the client instead of the `session`.
    async session({ token }: any) {
      return token;
    },
  },
  // Adding theme settings
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#2563EB", // Hex color code
    logo: "/quimer_logo.jpg", // Absolute URL to image
    buttonText: "#fff" // Hex color code
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export const handler = NextAuth(authOptions);
