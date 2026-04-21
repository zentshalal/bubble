import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: "Bubble",
  description:
    "Share your memories, chat and organize your life together on Bubble, the app designed exclusively for couples.",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
          position="top-center"
          duration={5000}
          toastOptions={{
            classNames: {
              toast:
                "cn-toast border-l-4 rounded-xl border border-neutral-200 bg-white text-[#333] shadow-xl",
            },
          }}
        />
      </body>
    </html>
  );
}
