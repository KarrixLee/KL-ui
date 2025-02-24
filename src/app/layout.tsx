import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootPage } from "@/components/root";
import { ThemeProvider } from "@/components/theme-proider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "KL UI - Modern React Component Library",
    template: "%s - KL UI",
  },
  description:
    "Animated UI components and effects with love. Build with shadcn/ui and Motion.",
  keywords: [
    "React",
    "Next.js",
    "Shadcn UI",
    "NextUI",
    "UI Library",
    "Components",
    "TypeScript",
    "Component Library",
    "Motion",
    "Framer Motion",
    "Changelog",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100 dark:bg-[#0C0E10] transition-theme`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main>
            <RootPage>{children}</RootPage>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
