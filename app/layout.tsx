import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Bubble",
  description:
    "Share your memories, chat and organize your life together on Bubble, the app designed exclusively for couples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
