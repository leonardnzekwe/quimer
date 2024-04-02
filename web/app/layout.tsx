import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import NextAuthProvider from '@/app/context';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quimer",
  description: "Computer Based Test System",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
