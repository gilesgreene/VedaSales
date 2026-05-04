import type { Metadata } from "next";
import { Sora, DM_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const sora = Sora({
  variable: "--vs-font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--vs-font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "VedaSales — Ecommerce Intelligence",
  description: "Find winning products before they peak with multi-source trend intelligence.",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${sora.variable} ${dmMono.variable} h-full antialiased dark`}
      >
        <body className="min-h-full flex flex-col bg-background text-foreground">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

