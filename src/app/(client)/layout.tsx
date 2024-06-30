import "../globals.css";

import type { Metadata } from "next";

import pretendard from "@/assets/font";
import Header from "@/components/common/Header";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: "Loggest",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Providers>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster position="top-right" richColors />
          </div>
        </Providers>
      </body>
    </html>
  );
}
