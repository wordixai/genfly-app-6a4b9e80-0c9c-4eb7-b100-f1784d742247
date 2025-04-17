import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { TRPCProvider } from "@/lib/trpc-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <TRPCProvider>{children}</TRPCProvider>
    </SessionProvider>
  );
}