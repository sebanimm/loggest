import { SessionProvider } from "next-auth/react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { MultiProvider } from "@/providers/multiProvider";
import { ThemeProvider } from "@/providers/themeProvider";

const provider = [TooltipProvider, ThemeProvider, SessionProvider];

export function Providers({ children }: { children: React.ReactNode }) {
  return <MultiProvider providers={provider}>{children}</MultiProvider>;
}
