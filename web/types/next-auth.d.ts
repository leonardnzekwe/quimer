// @/types/next-auth.d.ts

import NextAuth from "next-auth";

// prevents IDEs from removing the unused `NextAuth` import
NextAuth.name;

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context.
     * Session `user` should only contain immutable variables.
     */
    interface Session {
        access: string;
        refresh: string;
        user: {
            id: number;
            username: string;
            email: string;
            first_name: string;
            last_name: string;
            last_login: string,
            date_joined: string,
            is_active: boolean,
        },
    }
}
