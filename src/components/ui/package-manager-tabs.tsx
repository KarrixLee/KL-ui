"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Copy, Check } from "lucide-react";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
type CommandVariant = "add" | "install" | "dlx";

interface PackageManagerTabsProps {
  command: string;
  variant?: CommandVariant;
  className?: string;
  layoutId?: string;
}

// Move this outside the component to be shared
const STORAGE_KEY = "preferred-package-manager";

function getStoredManager(): PackageManager {
  if (typeof window === "undefined") return "pnpm";
  return (localStorage.getItem(STORAGE_KEY) as PackageManager) || "pnpm";
}

export function PackageManagerTabs({
  command,
  variant = "dlx",
  className,
  layoutId = "package-manager-tab",
}: PackageManagerTabsProps) {
  const [selected, setSelected] = useState<PackageManager>(getStoredManager);
  const [copied, setCopied] = useState(false);

  const options: { id: PackageManager; label: string }[] = [
    { id: "pnpm", label: "pnpm" },
    { id: "npm", label: "npm" },
    { id: "yarn", label: "yarn" },
    { id: "bun", label: "bun" },
  ];

  // Update localStorage when selection changes
  const handleSelect = (manager: PackageManager) => {
    setSelected(manager);
    localStorage.setItem(STORAGE_KEY, manager);
  };

  const getCommand = (manager: PackageManager) => {
    const prefixMap = {
      dlx: {
        pnpm: "pnpm dlx",
        npm: "npx",
        yarn: "npx",
        bun: "bunx --bun",
      },
      add: {
        pnpm: "pnpm add",
        npm: "npm install",
        yarn: "yarn add",
        bun: "bun add",
      },
      install: {
        pnpm: "pnpm install",
        npm: "npm install",
        yarn: "yarn install",
        bun: "bun install",
      },
    };

    const prefix = prefixMap[variant][manager];
    return `${prefix} ${command}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCommand(selected));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Tab buttons */}
      <div className="relative flex border-b border-gray-100 dark:border-zinc-700/50 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gray-100 dark:after:bg-zinc-700/50">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`relative pb-2 text-sm px-4 ${
              selected === option.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80 transition-all duration-300"
            }`}
          >
            {option.label}
            {selected === option.id && (
              <motion.div
                layoutId={layoutId}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Command display */}
      <div className="relative group">
        <div className="p-5 text-sm font-mono leading-[1.6rem] bg-primary dark:bg-gradient-to-br dark:from-zinc-800 dark:to-zinc-900 dark:border dark:border-zinc-700/10 rounded-lg overflow-x-auto text-gray-100">
          {getCommand(selected)}
        </div>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white/80 hover:text-white hover:bg-transparent"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-green-500"
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Copy className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}
