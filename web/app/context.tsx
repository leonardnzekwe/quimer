// @/app/context.txt - use to wrap the root layout.
// Can't call 'use client' in the RootLayout
// Hence reason for calling it here and wrapping Rootlayout with it
'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function NextAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
