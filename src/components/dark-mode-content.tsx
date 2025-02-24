"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function DarkModeContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col items-center gap-8 py-8 max-w-3xl">
      <div className="text-center">
        {isDark ? (
          <p className="font-medium">Welcome to the dark mode ...</p>
        ) : (
          <p className="font-medium">Click to enter the mystery ...</p>
        )}
        <div className="flex items-center justify-center gap-3 mt-4">
          <ModeToggle />
        </div>
      </div>

      {isDark ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full space-y-8"
        >
          <p className="text-zinc-300">
            I just realized that many of you are using dark mode in your site.
            Sorry that it came late, but late is better than never - I&apos;ve
            added dark mode support to all components.
          </p>
          <p className="text-zinc-300">
            And ngl, dark mode is actually pretty sick lol 🔥
          </p>

          <div className="space-y-6">
            <h2 className="text-lg font-medium inline-block">
              Installation Guide
              <div className="h-px bg-gradient-to-r from-zinc-500 to-transparent mt-1" />
            </h2>
            <p className="text-zinc-300">
              The installation is also not that hard, you can follow how shadcn
              ui did:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Next.js",
                  href: "https://ui.shadcn.com/docs/dark-mode/next",
                  icon: "/icons/next.svg",
                },
                {
                  name: "Vite",
                  href: "https://ui.shadcn.com/docs/dark-mode/vite",
                  icon: "/icons/vite.svg",
                },
                {
                  name: "Astro",
                  href: "https://ui.shadcn.com/docs/dark-mode/astro",
                  icon: "/icons/astro.svg",
                },
                {
                  name: "Remix",
                  href: "https://ui.shadcn.com/docs/dark-mode/remix",
                  icon: "/icons/remix.svg",
                },
              ].map((framework) => (
                <Link
                  key={framework.name}
                  href={framework.href}
                  className="group flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={framework.icon}
                      alt={framework.name}
                      className="w-5 h-5 invert"
                    />
                    <span className="font-medium">{framework.name}</span>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="text-sm text-muted-foreground italic text-center">
          Switch to dark mode to reveal the content...
        </div>
      )}
    </div>
  );
}
